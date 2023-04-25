const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
    constructor() {
        super('broadcast', {
            description: 'broadcast',
            category: 'boss-side',
            usage: 'broadcast <text>',
            aliases: ['bc'],
            exp: 150,
            cooldown: 5
        })
    }
    /**
     * @param {Message} M
     * @param {import('../../Handlers/Message').args} args
     * @returns {Promise<void>}
     */
    //{command,prefix,text,pushName,participants,args,iscreator,body,quoted,mime}
    execute = async (M) => {
        if (!M.txt) return M.reply("❌ No query provided!")
        const bct=body.slice(4)
        let getGroups = await this.helper.groupFetchAllParticipating()
        let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
        let anu = groups.map(v => v.id)
        M.reply(` Broadcasting in ${anu.length} Groups in about ${anu.length * 1.5} seconds`)
        for (let i of anu) {
            //await sleep(1500)

let txt = `Broadcast🎃\n\n *Author:* ${M.sender.username}\n\n💬 *Message:* ${bct}`

if(/image/.test(mime)) {
let media = await M.quoted.download()

await this.helper.sendMessage(i, { image:media,  caption: txt,mentions:participants.map(a => a.id) })
}
if(/video/.test(mime)){
let media = await quoted.download()
await this.helper.sendMessage(i, { video:media,  caption: txt, mentions:participants.map(a => a.id) })
}
            }
        M.reply(`Successfuly Broadcasted in ${anu.length} Groups`)
    }
}
