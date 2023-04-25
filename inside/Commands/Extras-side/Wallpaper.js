const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
    constructor() {
        super('wallpaper', {
            description: 'Sends random wallpaper',
            category: 'extras-side',
            usage: 'wallpaper',
            exp: 20,
            cooldown: 5,
            aliases: ['wp']
        })
    }

    /**
     * @param {Message} M
     * @returns {Promise<void>}
     */

    execute = async (M) => {
        const { url } = await this.helper.utils.fetch('https://nekos.life/api/v2/img/wallpaper')
        return void (await M.reply(await this.helper.utils.getBuffer(url), 'image'))
    }
}