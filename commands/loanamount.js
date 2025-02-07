const { bot, settings } = require(process.cwd())
const ms = require('ms')

module.exports = {
    command: {
        name: '+loanamount',
        aliases: ['+loana'],
        admin: true
    },
    execute: async (message, args, {Settings}) => {
        let amount = args?.[0]

        if (!amount || !Number(amount))
            return 'قم بكتابة مبلغ صحيح'

        amount = Math.min(amount, 1000000)
        amount = Math.max(amount, 500)

        Settings.loanamount = amount

        Settings.save()

        return '**:white_check_mark: تم تغيير مبلغ القرض الى: $ '+bot.format(amount)+'**'
    }
}