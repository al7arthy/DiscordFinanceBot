const { bot, user, handleColors } = require(process.cwd())
const path = require('path')
const Canvas = require('canvas')

module.exports = {
    command: {
        name: 'نرد',
        aliases: ['النرد', 'dice', 'dise'],
        showOnTimes: true,
        cooldown: 1000
    },
    svg: '<svg width="700" height="250" viewBox="0 0 700 250" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_71_54)"><path d="M20 80C20 46.8629 46.8629 20 80 20H657C669.703 20 680 30.2975 680 43V191C680 212.539 662.539 230 641 230H59C37.4609 230 20 212.539 20 191V80Z" fill="--color1--" fill-opacity="0.72"/><path d="M25 64C25 42.4609 42.4609 25 64 25H646C667.539 25 685 42.4609 685 64V196C685 217.539 667.539 235 646 235H94C55.8924 235 25 204.108 25 166V64Z" fill="--color1--" fill-opacity="0.72"/><path d="M25.5 70C25.5 41.0051 49.0051 17.5 78 17.5H587C640.848 17.5 684.5 61.1522 684.5 115V171C684.5 201.652 659.652 226.5 629 226.5H123C69.1522 226.5 25.5 182.848 25.5 129V70Z" stroke="--color2--" stroke-opacity="0.38"/><rect x="56" y="43" width="164" height="164" rx="82" fill="--color2--"/><rect x="481" y="43" width="164" height="164" rx="82" fill="--color2--"/></g><defs><clipPath id="clip0_71_54"><rect width="700" height="250" fill="--color2--"/></clipPath></defs></svg>',
    execute: async (message, args, {Settings, User}) => {

        let amount = 0;
        if (args?.[0])
            switch (args?.[0]) {
                case 'كامل':
                    amount = BigInt(User.credits);
                    break;
                case 'نص':
                    amount = BigInt(Math.floor(parseInt(User.credits) / 2));
                    break;
                case 'ربع':
                    amount = BigInt(Math.floor(parseInt(User.credits) / 4));
                    break;
                default:
                    if (Number(args[0]))
                        amount = BigInt(parseInt(args[0], 10));
                    break;
            }

        if (amount < 1000n)
            return "**اقل مبلغ للعب هو $1000**"

        if (BigInt(User.credits) < BigInt(amount))
            return '**ماعندك هذا المبلغ**'

        let userRoll = Math.floor(Math.random() * 6) + 1;
        let botRoll = Math.floor(Math.random() * 6) + 1;
        let earnings = userRoll > botRoll ? amount : userRoll < botRoll ? -amount : 0;

        User.credits = (BigInt(User.credits)+BigInt(earnings)).toString();
        await User.save()

        let canvas = Canvas.createCanvas(700, 250)
        let ctx = canvas.getContext('2d')

        let bg
        try {
            bg = await Canvas.loadImage(Settings?.background ?? path.join(process.cwd(), 'src', 'bg.png'))
        } catch {
            bg = await Canvas.loadImage(path.join(process.cwd(), 'src', 'bg.png'))
        }
        ctx.drawImage(bg, 0, 0, 700, 250)

        ctx.drawImage(await handleColors(Settings, module.exports.svg), 0, 0, 700, 250)

        await Canvas.loadImage(bot.user.avatarURL).then(avatar => {
            ctx.save();
            ctx.beginPath();
            ctx.arc(59 + 158 / 2, 46 + 158 / 2, 158 / 2, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(avatar, 59, 46, 158, 158);
            ctx.restore();
        })
        await Canvas.loadImage(path.join(process.cwd(), 'src', 'dice' + botRoll + '.png')).then(bg => ctx.drawImage(bg, 230, 139, 53, 53))

        await Canvas.loadImage(message.member.avatarURL).then(avatar => {
            ctx.save();
            ctx.beginPath();
            ctx.arc(484 + 158 / 2, 46 + 158 / 2, 158 / 2, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(avatar, 484, 46, 158, 158);
            ctx.restore();
        })
        await Canvas.loadImage(path.join(process.cwd(), 'src', 'dice' + userRoll + '.png')).then(bg => ctx.drawImage(bg, 418, 139, 53, 53))

        ctx.font = '40px Tajawal';
        ctx.fillStyle = Settings?.tcolor ?? 'white';
        ctx.textAlign = 'center';
        ctx.fillText(userRoll > botRoll ? 'لقد ربحت' : userRoll < botRoll ? 'لقد خسرت' : 'تعادل', 350, 104);

        bot.cooldown.add(message.member.id, module.exports.command.name, module.exports.command.cooldown)
        return ['**:bank: `'+botRoll+'` :game_die: `'+userRoll+'` :bust_in_silhouette:\n:arrow_right: $' + bot.format(earnings) + '\n:dollar: $' + bot.format(User.credits) + '**', { name: 'Dice.png', file: canvas.toBuffer('image/png') }]

    }
}