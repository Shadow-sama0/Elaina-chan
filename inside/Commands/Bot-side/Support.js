const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
    constructor() {
        super('support', {
            description: "Displays the bot's support group link",
            category: 'bot-side',
            exp: 20,
            usage: 'supprt',
            cooldown: 10
        })
    }

    /**
     * @param {Message} m
     * @param {import('../../Handlers/Message').args} args
     * @returns {Promise<void>}
     */

    execute = async (m, args) => {
        m.reply(`Support group links have been sent to your dm.`)
        let gif = 'https://telegra.ph/file/0405b77936b0ebd67f3f1.mp4'
        let text = `\n✨ *Support*
No group links for support yet! Wish to report a bug? Contact Shadow-sama via the mods command`
        await this.client.sendMessage(
            m.sender.jid,
            {
                video:{url:gif}, 
                gifPlayback: true ,
                caption:text
            },
            {
                quoted:m.message
            })
    }
}