const { bot, settings } = require(process.cwd())

module.exports = {
    command: {
        name: '+setlog',
        admin: true
    },
    execute: async (message, args, {Settings}) => {
        let channel = message?.channelMentions?.[0];

        if (!channel)
            return 'قم بمنشن الشات'

        Settings.log = channel

        Settings.save()

        return '**:white_check_mark: تم تعيين الشات بنجاح**'
    }
}