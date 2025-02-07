const path = require('path')
const fs = require('fs')
const { bot } = require(process.cwd())

module.exports.loadCommands = () => {
    let interactionsPath = path.join(process.cwd(), 'commands')
    for (let fileName of fs.readdirSync(interactionsPath))
        if (fileName.endsWith('.js')) {
            let file = require(path.join(interactionsPath, fileName))
            if (file) {
                bot.commands.set(file.command.name, file)
                if (file?.command?.aliases)
                    for (let name of file.command.aliases)
                        bot.commands.set(name, file)
            }
        }
}