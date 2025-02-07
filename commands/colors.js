const { bot } = require(process.cwd())

module.exports = {
    command: {
        name: '+color1',
        aliases: ['+color2', '+tcolor', '+ecolor'],
        admin: true
    },
    execute: async (message, args, {cmd, Settings}) => {
        let color = args?.[0]
        if (!color)
            return 'الرجاء كتابة اللون, مثال: #00ff00'

        if (!color.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/))
            return 'صيغة لون غير صحيحة, الصيغة المسموح بها من نوع Hex'

        Settings[cmd.slice(1)] = color

        Settings.save()

        return '**:white_check_mark: تم**'
    }
}