const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
    constructor() {
        super('icon', {
            description: 'Sends random waifu icon/pfp',
            category: 'extras-side',
            usage: 'icon',
            exp: 20,
            cooldown: 5,
            aliases: ['pfp']
        })
    }

    /**
     * @param {Message} M
     * @returns {Promise<void>}
     */

    execute = async (M) => {
        const { url } = await this.helper.utils.fetch('https://nekos.life/api/v2/img/avatar')
        return void (await M.reply(await this.helper.utils.getBuffer(url), 'image'))
    }
}