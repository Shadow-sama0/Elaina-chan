const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
    constructor() {
        super('help', {
            description: "Displays the bot's usable commands",
            category: 'bot-side',
            exp: 20,
            usage: 'help || help <command_name>',
            aliases: ['h'],
            cooldown: 10
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
            const commands = Array.from(this.handler.commands, ([command, data]) => ({
                command,
                data
            }))
            const image = this.helper.assets.get('help')
            const emo=["💰","🕹","🍀","🎐","⛩️"]
            let text = `(🖤ω🖤) Yo *@${M.sender.jid.split('@')[0]}*, I'm 🎐${
                this.helper.config.name
            }🤖\nMy prefix is - "${this.helper.config.prefix}"\n\n💫My commands are as followed=`
            const categories = []
            for (const command of commands) {
                if (command.data.config.category === 'boss-side') continue
                if (categories.includes(command.data.config.category)) continue
                categories.push(command.data.config.category)
            }
            for (const category of categories) {
                const categoryCommands = []
                const filteredCommands = commands.filter((command) => command.data.config.category === category)
                text += `\n\n*》${emo, this.helper.utils.capitalize(category)}*\n`
                filteredCommands.forEach((command) => categoryCommands.push(command.data.name))
                text += `\`\`\`${categoryCommands.join(', ')}\`\`\``
            }
            //text += `\n\n🗿 You can use ${this.helper.config.prefix}help ⌈command name⌋ for more info about a command\nExample: *${this.helper.config.prefix}help info`
            text += `\n\n\`\`\`  ⌈🎀${this.helper.config.name}🔮⌋\nA bot developed by Empty-Sama\n\nUse ${this.helper.config.prefix}help [command name] for more info about a command\`\`\``
            return void (await M.reply(image, 'image', true, undefined, text, [M.sender.jid]))
        } else {
            const cmd = context.trim().toLowerCase()
            const command = this.handler.commands.get(cmd) || this.handler.aliases.get(cmd)
            if (!command) return void M.reply(`Command ${cmd} not found baka❌ | *"${context.trim()}"*`)
            return void M.reply(
                `👾 *Command:* ${this.helper.utils.capitalize(command.name)}\n🎴 *Aliases:* ${
                    !command.config.aliases
                        ? ''
                        : command.config.aliases.map((alias) => this.helper.utils.capitalize(alias)).join(', ')
                }\n🪁 *Category:* ${this.helper.utils.capitalize(command.config.category)}\n⏳ *Cooldown:* ${
                    command.config.cooldown ?? 3
                }s\n🧩 *Usage:* ${command.config.usage
                    .split('||')
                    .map((usage) => `${this.helper.config.prefix}${usage.trim()}`)
                    .join(' | ')}\n📌 *Description:* ${command.config.description}`
            )
        }
    }
}
