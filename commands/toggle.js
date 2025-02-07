const { bot, settings } = require(process.cwd())

module.exports = {
    command: {
        name: '+togembed',
        aliases: ['+togimage', '+togrobbery', '+togtransactions', '+togloan'],
        admin: true
    },
    execute: async (message, args, {cmd, Settings}) => {

        Settings[cmd.slice(4)] = !Settings[cmd.slice(4)]

        Settings.save()

        return '**:white_check_mark: تم**'
    }
}