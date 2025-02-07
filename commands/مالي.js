const Canvas = require('canvas');
const path = require('path')
const { bot, user, handleColors } = require(process.cwd())

module.exports = {
    command: {
        name: 'قروشي',
        aliases: ['دراهمي', 'فلوسي', 'مالي', 'زلطي', 'قروش', 'دراهم', 'فلوس', 'مال', 'زلط', 'رصيد', 'رصيدي'],
    },
    svg: '<svg width="700" height="250" viewBox="0 0 700 250" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_71_2)"><path d="M20 80C20 46.8629 46.8629 20 80 20H657C669.703 20 680 30.2975 680 43V191C680 212.539 662.539 230 641 230H59C37.4609 230 20 212.539 20 191V80Z" fill="--color1--" fill-opacity="0.72"/><path d="M25 64C25 42.4609 42.4609 25 64 25H646C667.539 25 685 42.4609 685 64V196C685 217.539 667.539 235 646 235H94C55.8924 235 25 204.108 25 166V64Z" fill="--color1--" fill-opacity="0.72"/><path d="M78 17.5H587C640.848 17.5 684.5 61.1522 684.5 115V171C684.5 201.652 659.652 226.5 629 226.5H123C69.1522 226.5 25.5 182.848 25.5 129V70C25.5 41.0051 49.0051 17.5 78 17.5Z" stroke="--color2--" stroke-opacity="0.38"/><rect x="70" y="43" width="164" height="164" rx="82" fill="--color2--"/><path d="M629.125 60.8752H659.875M630.833 55.7502H658.167M634.25 55.7502V47.2085M641.083 55.7502V47.2085M647.917 55.7502V47.2085M654.75 55.7502V47.2085M644.5 36.9702L644.513 36.9587M659.875 42.0835L648.132 31.6452C646.847 30.5029 646.204 29.9318 645.479 29.7148C644.84 29.5238 644.16 29.5238 643.521 29.7148C642.796 29.9318 642.153 30.5029 640.868 31.6452L629.125 42.0835H659.875Z" stroke="--color2--" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_71_2"><rect width="700" height="250" fill="white"/></clipPath></defs></svg>',
    execute: async (message, args, { Settings }) => {
        let theUser = message.member.guild.members.get(message?.mentions?.[0]?.id) || message.member.guild.members.get(args?.[0]) || message.member
        if (!theUser)
            return;

        let User = await user.findOne({ guildId: message.guildID, botId: bot.user.id, userId: theUser.id })
        if (!User)
            User = await new user({ guildId: message.guildID, botId: bot.user.id, userId: theUser.id })

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

        await Canvas.loadImage(theUser.avatarURL).then(avatar => {
            ctx.save();
            ctx.beginPath();
            ctx.arc(73 + 158 / 2, 46 + 158 / 2, 158 / 2, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(avatar, 73, 46, 158, 158);
            ctx.restore();
        })

        ctx.font = 'bold 30px Sans';
        ctx.fillStyle = Settings?.tcolor ?? 'white';
        ctx.textAlign = 'left';
        ctx.fillText(theUser?.username ?? 'unknown', 250, 112);

        ctx.fillText('$ ' + bot.format(User.credits), 250, 153, 400);

        return ['**:bust_in_silhouette:' + theUser?.mention + ' $' + bot.format(User.credits) + '**', { name: 'balance.png', file: canvas.toBuffer('image/png') }]
    }
}