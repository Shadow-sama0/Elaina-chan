const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
    constructor() {
        super('cat', {
            description: 'Sends random cat image',
            category: 'extras-side',
            usage: 'cat',
            exp: 20,
            cooldown: 5,
            aliases: ['meow']
        })
    }

    /**
     * @param {Message} M
     * @returns {Promise<void>}
     */

    execute = async (M) => {
        const { url } = await this.helper.utils.fetch('https://nekos.life/api/v2/img/meow')
        return void (await M.reply(await this.helper.utils.getBuffer(url), 'image'))
    }
}