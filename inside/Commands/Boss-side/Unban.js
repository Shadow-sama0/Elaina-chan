const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
    constructor() {
        super('unban', {
            description: `Unban's a banned user users`,
            category: 'boss-side',
            usage: 'unban @user',
            cooldown: 5
        })
    }

    /**
     * @param {Message} M
     * @returns {Promise<void>}
     */

    execute = async (M) => {
        const users = M.mentioned
        if (M.quoted && !users.includes(M.quoted.sender.jid)) users.push(M.quoted.sender.jid)
        if (users.length < 1) return void M.reply('❌Tag a user to use this command')
        let text = '✔ Unbanned\n'
        let Text = `🚫Skipped\n User:`
        let resultText = ''
        for (const user of users) {
            const info = await this.helper.DB.getUser(user)
            if (!info.ban === 'unban') {
                Text += `*@${user.split('@')[0]}*\n`
                resultText += Text
                continue
            }
            if (info.ban === 'ban'){
                text += `\n*@${user.split('@')[0]}*`
                await this.helper.DB.user.updateOne({ jid: user }, { $set: { ban: false } })
                resultText += text
            }
        }
        return void (await M.reply(resultText, 'text', undefined, undefined, undefined, users))
    }
}
