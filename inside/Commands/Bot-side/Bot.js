const command = require("../../Structures/Command");
const Message = require('../../Structures/Message')

module.exports = class commands extends command{
    constructor(){
        super('bot',{
            description: 'bot + host info',
            category: 'bot-side',
            exp: 25,
            usage: 'bot',
            aliases: ['b'],
            cooldown: 5
        })
    }

    /**
     * @param {Message} M
     * @param {args} args
     * @returns {Promise<void>}
     */

    execute = async (M, args) => {
        const image = this.helper.assets.get('bot')
        let text = `Well @${M.sender.jid.split('@')[0]}\n\n👾Bot = ${this.helper.config.name
        }\n🎐Host = ${this.helper.contact.getContact(this.helper.config.mods[0]).username}
        \n you can use ${this.helper.config.prefix}host to get contact info of my host`

        return void (await M.reply(image, 'image', true, undefined, text, [M.sender.jid]))
    }
}