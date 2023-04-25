require('dotenv').config()
const { default: Baileys, DisconnectReason, fetchLatestBaileysVersion } = require('@adiwajshing/baileys')
const P = require('pino')
const { Boom } = require('@hapi/boom')
const cfonts=require('cfonts')
const qr = require('qr-image')
const mongoose = require('mongoose')
const Message = require('./Structures/Message')
const MessageHandler = require('./Handlers/Message')
const AssetHandler = require('./Handlers/Asset')
const CallHandler = require('./Handlers/Call')
const Helper = require('./Structures/Helper')
const Server = require('./Structures/Server')
const Auth = require('./Structures/Auth')
const chalk = require('chalk')

const helper = new Helper({
    prefix: process.env.PREFIX || '+',
    name: process.env.NAME || 'Bot',
    mods: (process.env.MODS || '27729378630').split(', ').map((jid) => `${jid}@s.whatsapp.net`),
    session: process.env.SESSION || 'SESSION',
    PORT: Number(process.env.PORT || 4090),
    MONGO_URI: (process.env.MONGO_URI || '') 
})

new Server(helper)

const start = async () => {
    if(!helper.config.MONGO_URI) {
        throw new Error('No MongoDB URI provided')
    }

    await mongoose.connect(helper.config.MONGO_URI)

    helper.log('Connected to the Database')

    const { useAuthFromDatabase } = new Auth(helper.config.session)

    const EMPTY= `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`
    const MPT = `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`
    const MT = `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`

    cfonts.say(`${helper.config.name} BY EMPTY`, {
        font: 'slick',
        align: 'center',
        colors: [MPT,EMPTY],
        background: 'transparent',
        letterSpacing: 2,
        lineHeight: 2,
        space: true,
        maxLength: '0',
        gradient: [MPT,EMPTY,MT],
        independentGradient: false,
        transitionGradient: true,
        env: 'node'
    });

    console.log(chalk['white'](helper.config.session))

    const { saveState, state, clearState } = await useAuthFromDatabase()

    const client = Baileys({
        version: (await fetchLatestBaileysVersion()).version,
        printQRInTerminal: true,
        auth: state,
        logger: P({ level: 'fatal' }),
        browser: ['Empty', 'fatal', '1.0.0']
    })

    const messageHandler = new MessageHandler(client, helper)

    const callHandler = new CallHandler(client, helper)

    new AssetHandler(helper).loadAssets()

    messageHandler.loadCommands()

    client.ev.on('messages.upsert', async ({ messages }) => {
        const M = await new Message(messages[0], client).simplifyMessage()
        await messageHandler.handleMessage(M)
    })

    client.ws.on('CB:call', async (call) => await callHandler.handleCall(call))

    client.ev.on('contacts.update', async (contacts) => await helper.contact.saveContacts(contacts))

    client.ev.on('connection.update', (update) => {
        if (update.qr) {
            helper.log(
                `QR code generated. Scan it to continue or go to http://localhost:${helper.config.PORT}`
            )
            helper.QR = qr.imageSync(update.qr)
        }
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            const { statusCode } = new Boom(lastDisconnect?.error).output
            if (statusCode !== DisconnectReason.loggedOut) {
                helper.log('Reconnecting...')
                setTimeout(() => start(), 3 * 1000)
            } else {
                clearState()
                helper.state = 'logged_out'
                helper.log('Disconnected')
            }
        }
        if (connection === 'connecting') {
            helper.state = 'connecting'
            helper.log('Connecting to WhatsApp...')
        }
        if (connection === 'open') {
            helper.state = 'open'
            helper.log('Connected to WhatsApp')
        }
    })

    client.ev.on('creds.update', saveState)

    return client
}

start()
