const { bot, settings } = require(process.cwd())

module.exports = {
    command: {
        name: '+robper',
        admin: true
    },
    execute: async (message, args, {Settings}) => {
        let robberyPer = args?.[0];

        if (!robberyPer)
            return 'قم بذكر النسبة, مثال: 0.5'

        if (!Number(robberyPer))
            return 'رقم غير صالح'

        robberyPer = Math.min(Number(robberyPer), 100)
        robberyPer = Math.max(Number(robberyPer), 1)

        Settings.robberyPer = robberyPer

        Settings.save()

        return '**:white_check_mark: تم تغيير نسبة السرقة بنجاح الى: '+robberyPer+'%**'
    }
}