const { bot, settings } = require(process.cwd())

module.exports = {
    command: {
        name: '+setimage',
        admin: true
    },
    execute: async (message, args, {Settings}) => {
        let image = args?.[0];

        if (!image || !image.startsWith('http'))
            return 'قم بارفاق رابط الصورة'

        Settings.background = image

        Settings.save()

        return '**:white_check_mark: تم تغيير الصورة بنجاح**'
    }
}