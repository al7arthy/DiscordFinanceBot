const { bot, settings } = require(process.cwd())
const ms = require('ms')

module.exports = {
    command: {
        name: '+loantime',
        aliases: ['+loant'],
        admin: true
    },
    execute: async (message, args, {Settings}) => {
        let time = args

        if (!args[0])
            return 'قم بكتابة الوقت, مثال: 1h, 30m'

        time = args.reduce((total, part) => total + ms(part), 0)
        if (!time)
            return 'وقت غير صالح, الصيغ المسموح بها هي:\n> s, m, h'

        time = Math.min(time, ms('20h'))
        time = Math.max(time, ms('5m'))

        Settings.loantime = time

        Settings.save()

        return '**:white_check_mark: تم تغيير مدة سحب القرض الى: '+ms(time, { long: true }).replace('hours', 'ساعة').replace('hour', 'ساعة').replace('minutes', 'دقيقة').replace('minute', 'دقيقة').replace('seconds', 'ثانية').replace('second', 'ثانية').replace('milliseconds', 'جزء من الثانية').replace('millisecond', 'جزء من الثانية')+'**'
    }
}