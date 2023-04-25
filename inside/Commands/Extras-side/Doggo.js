const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
    constructor() {
        super('doggo', {
            description: 'Sends random doggo image',
            category: 'extras-side',
            usage: 'doggo',
            exp: 20,
            cooldown: 5,
            aliases: ['woof']
        })
    }

    /**
     * @param {Message} M
     * @returns {Promise<void>}
     */

    execute = async (M) => {
        const { url } = await this.helper.utils.fetch('https://nekos.life/api/v2/img/woof')
        return void (await M.reply(await this.helper.utils.getBuffer(url), 'image'))
    }
}