const command = require("../../Structures/Command");
const Message = require('../../Structures/Message')

module.exports = class commands extends command{
    constructor(){
        super('host',{
            description: 'contact my host',
            category: 'bot-side',
            exp: 25,
            usage: 'host',
            aliases: ['ht'],
            cooldown: 5
        })
    }

    /**
     * @param {Message} M
     * @param {args} args
     * @returns {Promise<void>}
     */

    execute = async (M, args) => {
        const image = this.helper.assets.get('host')
        let text = `*🍕 *Username:* ${
            this.helper.contact.getContact(this.helper.config.mods[0]).username
        }\n🌀 *Contact: https://wa.me/+${this.helper.config.mods[0].split('@')[0]}*`
        return void (await M.reply(image, 'image', true, undefined, text, [M.sender.jid]))
    }

}
