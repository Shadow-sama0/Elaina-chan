const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
    constructor() {
        super('mods', {
            description: "My owner and moderators",
            category: 'bot-side',
            exp: 20,
            usage: 'mod',
            aliases: ['mod' || 'owner'],
            cooldown: 10,
            dm: true,
        })
    }

    /**
     * @param {Message} M
     * @param {import('../../Handlers/Message').args} args
     * @returns {Promise<void>}
     */

    execute = async (M, args) => {
        const { context } = args
        if (!context) {
            if (!this.helper.config.mods) return void reply('*[UNMODERATED]*')
            const image = this.helper.assets.get('mod') 
            let text = `🤖 *${this.helper.config.name} Moderators* \n`
        for (let i = 0; i < this.helper.config.mods.length; i++)
            text += `\n*#${i + 1}*\n🥷🏻 *Username:* ${
                this.helper.contact.getContact(this.helper.config.mods[i]).username
            }\n🌀 *Contact: https://wa.me/+${this.helper.config.mods[i].split('@')[0]}*`
            return void (await M.reply(image, 'image', true, undefined, text, [M.sender.jid]))
        }
    }
}
