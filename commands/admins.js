const { bot, settings } = require(process.cwd())

module.exports = {
    command: {
        name: '+manager',
        aliases: ['+مدير'],
        admin: true
    },
    execute: async (message, args, {Settings}) => {
        let user = message?.mentions?.[0]?.id;

        if (!user)
            return 'قم بمنشن للعضو'

        let exists = Settings.admins.includes(user);
        if (exists)
            Settings.admins = Settings.admins.filter(id => user !== id)
        else
            Settings.admins.push(user)

        Settings.save()

        return '**:white_check_mark: تم**'
    }
}