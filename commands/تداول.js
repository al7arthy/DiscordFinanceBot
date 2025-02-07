const { bot, user, handleColors } = require(process.cwd())
const path = require('path')
const Canvas = require('canvas')

module.exports = {
    command: {
        name: 'تداول',
        aliases: ['اتداول'],
        showOnTimes: true,
        cooldown: 1000
    },
    increase: '<svg width="700" height="250" viewBox="0 0 700 250" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M128 158L61.5 198L576 198.5V46L512 83.5L448.5 121H384L320.5 83L255.5 121H192L128 158Z" fill="--color1--" fill-opacity="0.5"/><path d="M61.5 198L128 158L192 121H255.5L320.5 83L384 121H448.5L512 83.5L576 46" stroke="--color1--" stroke-width="5" stroke-linecap="round"/><rect x="59" y="59" width="5" height="142" rx="2.5" fill="--color2--"/><rect x="59" y="196" width="519" height="5" rx="2.5" fill="--color2--"/><rect x="55" y="156" width="13" height="5" rx="2.5" fill="--color2--"/><rect x="55" y="196" width="13" height="5" rx="2.5" fill="--color2--"/><rect x="55" y="118" width="13" height="5" rx="2.5" fill="--color2--"/><rect x="55" y="80" width="13" height="5" rx="2.5" fill="--color2--"/><rect x="125" y="205" width="13" height="5" rx="2.5" transform="rotate(-90 125 205)" fill="--color2--"/><rect x="59" y="205" width="13" height="5" rx="2.5" transform="rotate(-90 59 205)" fill="--color2--"/><rect x="189" y="205" width="13" height="5" rx="2.5" transform="rotate(-90 189 205)" fill="--color2--"/><rect x="253" y="205" width="13" height="5" rx="2.5" transform="rotate(-90 253 205)" fill="--color2--"/><rect x="317" y="205" width="13" height="5" rx="2.5" transform="rotate(-90 317 205)" fill="--color2--"/><rect x="381" y="205" width="13" height="5" rx="2.5" transform="rotate(-90 381 205)" fill="--color2--"/><rect x="445" y="205" width="13" height="5" rx="2.5" transform="rotate(-90 445 205)" fill="--color2--"/><rect x="509" y="205" width="13" height="5" rx="2.5" transform="rotate(-90 509 205)" fill="--color2--"/><rect x="573" y="205" width="13" height="5" rx="2.5" transform="rotate(-90 573 205)" fill="--color2--"/><path d="M584.284 37.9904C586.594 37.9904 588.037 40.4904 586.882 42.4904L579.088 55.9904C577.933 57.9904 575.047 57.9904 573.892 55.9904L566.098 42.4904C564.943 40.4904 566.386 37.9904 568.696 37.9904L584.284 37.9904Z" fill="--color1--"/><rect x="599" y="21" width="47" height="47" rx="23.5" fill="--color1--"/></svg>',
    decrease: '<svg width="700" height="250" viewBox="0 0 700 250" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M128 158L61.5 198L576 198.5V148L512 83.5L448.5 47H384L320.5 83L255.5 121H192L128 158Z" fill="--color1--" fill-opacity="0.5"/><path d="M61.5 198L128 158L192 121H255.5L320.5 83L384 46H448.5L512 83.5L576.5 148" stroke="--color1--" stroke-width="5" stroke-linecap="round"/><rect x="59" y="59" width="5" height="142" rx="2.5" fill="--color2--"/><rect x="59" y="196" width="519" height="5" rx="2.5" fill="--color2--"/><rect x="55" y="156" width="13" height="5" rx="2.5" fill="--color2--"/><rect x="55" y="196" width="13" height="5" rx="2.5" fill="--color2--"/><rect x="55" y="118" width="13" height="5" rx="2.5" fill="--color2--"/><rect x="55" y="80" width="13" height="5" rx="2.5" fill="--color2--"/><rect x="125" y="205" width="13" height="5" rx="2.5" transform="rotate(-90 125 205)" fill="--color2--"/><rect x="59" y="205" width="13" height="5" rx="2.5" transform="rotate(-90 59 205)" fill="--color2--"/><rect x="189" y="205" width="13" height="5" rx="2.5" transform="rotate(-90 189 205)" fill="--color2--"/><rect x="253" y="205" width="13" height="5" rx="2.5" transform="rotate(-90 253 205)" fill="--color2--"/><rect x="317" y="205" width="13" height="5" rx="2.5" transform="rotate(-90 317 205)" fill="--color2--"/><rect x="381" y="205" width="13" height="5" rx="2.5" transform="rotate(-90 381 205)" fill="--color2--"/><rect x="445" y="205" width="13" height="5" rx="2.5" transform="rotate(-90 445 205)" fill="--color2--"/><rect x="509" y="205" width="13" height="5" rx="2.5" transform="rotate(-90 509 205)" fill="--color2--"/><rect x="573" y="205" width="13" height="5" rx="2.5" transform="rotate(-90 573 205)" fill="--color2--"/><path d="M575.239 136.677C576.802 134.976 579.619 135.604 580.311 137.807L584.981 152.68C585.673 154.883 583.72 157.009 581.466 156.507L566.251 153.115C563.997 152.612 563.132 149.858 564.694 148.157L575.239 136.677Z" fill="--color1--"/><rect x="599" y="123" width="47" height="47" rx="23.5" fill="--color1--"/></svg>',
    execute: async (message, args, { Settings, User }) => {

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

        const percentage = Math.floor((Math.random() * 40) - 20);
        const earnings = BigInt(Math.round((percentage / 100) * Number(amount)));

        User.credits = (BigInt(User.credits) + earnings).toString();
        await User.save()

        let canvas
        if (Settings.image) {
            canvas = Canvas.createCanvas(700, 250)
            let ctx = canvas.getContext('2d')
            let y = earnings >= 0 ? 23 : 125

            let bg
            try {
                bg = await Canvas.loadImage(Settings?.background ?? path.join(process.cwd(), 'src', 'bg.png'))
            } catch {
                bg = await Canvas.loadImage(path.join(process.cwd(), 'src', 'bg.png'))
            }
            ctx.drawImage(bg, 0, 0, 700, 250)

            ctx.drawImage(await handleColors(Settings, module.exports[earnings >= 0 ? 'increase' : 'decrease']), 0, 0, 700, 250)

            await Canvas.loadImage(message.member.avatarURL).then(avatar => {
                ctx.save();
                ctx.beginPath();
                ctx.arc(601 + 43 / 2, y + 43 / 2, 43 / 2, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.clip();
                ctx.drawImage(avatar, 601, y, 43, 43);
                ctx.restore();
            })

            ctx.font = '25px Arial';
            ctx.fillStyle = Settings?.tcolor ?? 'white';
            ctx.textAlign = 'center';
            ctx.fillText((percentage ?? '0') + '%', 623, y + 75);
        }

        bot.cooldown.add(message.member.id, module.exports.command.name, module.exports.command.cooldown)

        let text = '**:hand_with_index_finger_and_thumb_crossed: $' + bot.format(amount) + '\n' + (earnings >= 0 ? ':chart_with_upwards_trend:' : ':chart_with_downwards_trend:') + ' $' + bot.format(earnings) + ' \`' + percentage + '%\`\n:dollar: $' + bot.format(User.credits) + '**'
        let content = Settings.embed
            ? {
                embeds: [{
                    thumbnail: { url: message.channel.guild.iconURL },
                    title: 'تداول',
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

        return [content, Settings.image ? { name: 'investment.png', file: canvas.toBuffer('image/png') } : false]
    }
}