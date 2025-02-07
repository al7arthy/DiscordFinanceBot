const { bot, user, handleColors } = require(process.cwd());
const path = require('path');
const Canvas = require('canvas');
const ms = require('ms');

module.exports = {
    command: {
        name: 'قرض',
        aliases: ['اقرضني', 'القرض'],
        showOnTimes: true,
        cooldown: 1000
    },
    svg: '<svg width="308" height="394" viewBox="0 0 308 394" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 187C18 153.863 44.8629 127 78 127H265C277.703 127 288 137.297 288 150V339C288 360.539 270.539 378 249 378H57C35.4609 378 18 360.539 18 339V187Z" fill="--color1--" fill-opacity="0.72"/><path d="M18 187C18 153.863 44.8629 127 78 127H265C277.703 127 288 137.297 288 150V193C288 214.539 270.539 232 249 232H57C35.4609 232 18 214.539 18 193V187Z" fill="--color1--" fill-opacity="0.72"/><path d="M20.5 224C20.5 170.152 64.1522 126.5 118 126.5H234C264.652 126.5 289.5 151.348 289.5 182V280C289.5 333.848 245.848 377.5 192 377.5H76C45.3482 377.5 20.5 352.652 20.5 322V224Z" stroke="--color2--" stroke-opacity="0.38"/><path d="M20 167.556C20 146.814 36.8142 130 57.5556 130H251C272.539 130 290 147.461 290 169V195C290 216.539 272.539 234 251 234H86.4444C49.7482 234 20 204.252 20 167.556Z" fill="--color1--" fill-opacity="0.72"/><path d="M20.5 162.503C20.5 142.619 36.6192 126.5 56.5033 126.5H223.818C260.093 126.5 289.5 155.907 289.5 192.182C289.5 212.792 272.792 229.5 252.182 229.5H87.4967C50.4954 229.5 20.5 199.505 20.5 162.503Z" stroke="--color2--" stroke-opacity="0.38"/><rect x="71" y="16" width="164" height="164" rx="82" fill="--color2--"/></svg>',
    execute: async (message, args, { Settings, User }) => {

        if (User.loan)
            return 'لديك قرض بالفعل'

        let amount = Settings.loanamount;

        User.credits = (BigInt(User.credits) + BigInt(amount)).toString()
        User.loan = true
        await User.save()

        let theTime = ms(Settings.loantime, { long: true }).replace('hours', 'ساعة').replace('hour', 'ساعة').replace('minutes', 'دقيقة').replace('minute', 'دقيقة').replace('seconds', 'ثانية').replace('second', 'ثانية').replace('milliseconds', 'جزء من الثانية').replace('millisecond', 'جزء من الثانية')

        let canvas
        if (Settings.image) {
            canvas = Canvas.createCanvas(308, 394)
            let ctx = canvas.getContext('2d')

            let bg
            try {
                bg = await Canvas.loadImage(Settings?.background ?? path.join(process.cwd(), 'src', 'bg.png'))
            } catch {
                bg = await Canvas.loadImage(path.join(process.cwd(), 'src', 'bg.png'))
            }
            ctx.drawImage(bg, 0, 0, 308, 394)

            ctx.drawImage(await handleColors(Settings, module.exports.svg), 0, 0, 308, 394)

            await Canvas.loadImage(message.member.avatarURL).then(avatar => {
                ctx.save();
                ctx.beginPath();
                ctx.arc(74 + 158 / 2, 19 + 158 / 2, 158 / 2, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.clip();
                ctx.drawImage(avatar, 74, 19, 158, 158);
                ctx.restore();
            })

            ctx.fillStyle = Settings?.tcolor ?? 'white';
            ctx.textAlign = 'center';

            ctx.font = '20px tajawal';
            ctx.fillText('لقد اخذت قرض شخصي', 155, 200 + 5);
            ctx.fillText('المبلغ', 155, 257 + 5);
            ctx.fillText('سيتم سحبه بعد', 155, 319 + 5);

            ctx.font = '28px tajawal';
            ctx.fillText('$'+bot.format(amount), 155, 288 + 5);
            ctx.fillText(theTime, 155, 353 + 5);
        }
        let text = '**لقد اخذت قرض شخصي\n:hand_with_index_finger_and_thumb_crossed: ' + bot.format(amount) + '\n:hourglass_flowing_sand: ' + theTime + '\n:dollar: $' + bot.format(User.credits) + '**'
        let content = Settings.embed
            ? {
                embeds: [{
                    thumbnail: { url: message.channel.guild.iconURL },
                    title: 'البنك',
                    color: parseInt(Settings.ecolor.slice(1) ?? 'ff5733', 16),
                    description: text,
                    footer: {
                        text: message.member.username,
                        icon_url: message.member.avatarURL
                    },
                    timestamp: new Date()
                }]
            }
            : text

        bot.cooldown.add(message.member.id, module.exports.command.name, module.exports.command.cooldown);
        setTimeout(async () => {
            let User = await user.findOne({ guildId: message.guildID, botId: bot.user.id, userId: message.member.id })
            if (!User)
                User = await new user({ guildId: message.guildID, botId: bot.user.id, userId: message.member.id })
        
            User.credits = (BigInt(User.credits) - BigInt(amount)).toString()
            User.loan = false
            User.save()
            await message.channel.createMessage(message.member.mention+', تم سحب مبلغ القرض من حسابك.')
        }, Settings.loantime);
        return [content, Settings.image ? { name: 'daily.png', file: canvas.toBuffer('image/png') } : false]
    }
}
