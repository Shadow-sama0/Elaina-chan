const Command = require('../Structures/Command')
const Message = require('../Structures/Message')

module.exports = class command extends Command {
    constructor() {
        super('command_name', {//enter your command name
            description: 'command_description',//describe the command 
            usage: 'example_of_using_the_command',//how to use the command 
            category: 'category',//add in a category or create new category 
            exp: 20,//this should be obvious
            dm: false,//may the command be used in dm?
            cooldown: 10//time before command can be used again
        })
    }

    /**
     * @param {Message} M
     * @param {args} args
     * @returns {Promise<void>}
     */

    execute = async (M, args) => {
        //do something
    }
}

/**
 * @typedef {import('../Handlers/Message').args} args
 */
/**By Empty ⚡ */
