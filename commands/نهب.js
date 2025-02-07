const Canvas = require('canvas');
const path = require('path')
const { bot, user, handleColors } = require(process.cwd())

module.exports = {
    command: {
        name: 'نهب',
        aliases: ['سرقه', 'زرف'],
    },
    svg: '<svg width="700" height="250" viewBox="0 0 700 250" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_71_71)"><path d="M20 80C20 46.8629 46.8629 20 80 20H657C669.703 20 680 30.2975 680 43V191C680 212.539 662.539 230 641 230H59C37.4609 230 20 212.539 20 191V80Z" fill="--color1--" fill-opacity="0.72"/><path d="M25 64C25 42.4609 42.4609 25 64 25H646C667.539 25 685 42.4609 685 64V196C685 217.539 667.539 235 646 235H94C55.8924 235 25 204.108 25 166V64Z" fill="--color1--" fill-opacity="0.72"/><path d="M25.5 70C25.5 41.0051 49.0051 17.5 78 17.5H587C640.848 17.5 684.5 61.1522 684.5 115V171C684.5 201.652 659.652 226.5 629 226.5H123C69.1522 226.5 25.5 182.848 25.5 129V70Z" stroke="--color2--" stroke-opacity="0.38"/><rect x="56" y="43" width="164" height="164" rx="82" fill="--color2--"/><rect x="481" y="43" width="164" height="164" rx="82" fill="--color2--"/><g clip-path="url(#clip1_71_71)"><path d="M359.459 117.193C359.683 116.249 359.837 115.251 359.883 114.182C360.77 94.7734 350.164 78.8809 334.268 68.6642C324.812 62.5846 315.844 69.2129 313.566 77.665C307.706 73.0011 297.558 79.9805 302.123 87.6469C302.289 87.9256 302.461 88.2066 302.632 88.4875C298.049 88.4699 283.445 88.4238 287.534 88.4919C292.367 88.5753 303.964 101.582 303.964 101.582V90.6077C307.526 96.0551 312.08 101.151 318.858 101.922C321.948 102.275 324.501 101.318 326.599 99.6436C329.248 102.885 330.598 106.524 330.861 110.892C328.541 110.857 326.215 110.951 323.866 111.225C315.765 112.18 310.766 113.965 309.128 122.439C306.666 135.221 313.314 144.558 320.484 154.329C326.318 162.276 339.746 154.575 333.835 146.515C329.002 139.931 324.141 134.521 324.341 126.87C329.064 126.152 333.761 126.345 338.556 126.804C340.902 127.814 343.549 128.222 346.17 128.018C350.079 141.088 357.502 152.729 367.115 162.658C374.063 169.837 384.987 158.879 378.049 151.73C368.517 141.871 362.133 130.465 359.459 117.193Z" fill="--color2--"/><path d="M300.935 54.4507C300.955 54.6702 300.961 54.8897 300.992 55.1114C301.978 62.2664 308.573 67.2683 315.724 66.2828C322.879 65.2996 327.874 58.7064 326.895 51.5514C326.693 50.0634 326.237 48.6784 325.591 47.4142C326.033 47.2013 326.232 46.6944 326.083 45.6387L325.657 42.5155C325.174 39.0236 321.955 36.5786 318.467 37.0614L304.548 38.9709C301.047 39.4538 298.609 42.6735 299.089 46.1698L299.43 48.696C297.478 50.2521 295.83 52.2186 296.188 54.3037C296.499 56.1539 298.549 55.6952 300.935 54.4507Z" fill="--color2--"/><path d="M336.247 66.4079C336.247 66.4079 367.589 83.2112 363.886 107.977C355.77 128.626 391.209 149.893 410.479 102.271C410.479 102.271 435.015 37.0022 336.247 66.4079ZM389.31 105.269V109.25H385.075V105.504C383.112 105.319 381.161 104.672 379.899 103.776L379.304 103.348L380.841 99.051L381.872 99.738C383.209 100.631 384.936 101.147 386.591 101.147C388.617 101.147 389.969 100.096 389.969 98.5352C389.969 97.4817 389.55 96.3383 386.448 95.0828C383.174 93.8011 379.818 91.9333 379.818 87.8686C379.818 84.6005 381.967 82.0524 385.336 81.203V77.3336H389.534V80.9396C391.139 81.102 392.541 81.5476 393.803 82.2872L394.508 82.7042L392.906 86.9358L391.918 86.3739C391.338 86.0425 389.971 85.259 387.8 85.259C385.661 85.259 384.899 86.3827 384.899 87.434C384.899 88.5731 385.465 89.3105 388.83 90.7064C391.74 91.8916 395.092 93.8274 395.092 98.2806C395.085 101.654 392.796 104.38 389.31 105.269Z" fill="--color2--"/></g></g><defs><clipPath id="clip0_71_71"><rect width="700" height="250" fill="--color2--"/></clipPath><clipPath id="clip1_71_71"><rect width="128" height="128" fill="--color2--" transform="translate(286 37)"/></clipPath></defs></svg>',
    execute: async (message, args, { Settings, User }) => {
        if (!Settings.robbery)
            return 'السرقه مغلقه مؤقتا'

        if (!message?.mentions?.[0]?.id && !args?.[0])
            return 'قم بمنشن من تريد سرقته'

        let theUser = message.member.guild.members.get(message?.mentions?.[0]?.id) || message.member.guild.members.get(args?.[0]);
        if (!theUser)
            return 'لم استطع التعرف على هذا العضو'

        let OtherUser = await user.findOne({ guildId: message.guildID, botId: bot.user.id, userId: theUser.id })
        if (!OtherUser)
            OtherUser = await new user({ guildId: message.guildID, botId: bot.user.id, userId: theUser.id })

        if (BigInt(OtherUser.credits) < 10000n)
            return 'حرام عليك طفران'

        let amount = Math.floor(Math.min(1, 0.4 + Math.random()) * (Number(OtherUser.credits) * (Settings.robberyPer / 100)))

        if (BigInt(OtherUser.credits) < BigInt(amount))
            return 'فشلت السرقة, جرب حظك مره ثانيه'

        User.credits = (BigInt(User.credits) + BigInt(amount)).toString()
        User.stolen = (BigInt(User.stolen) + BigInt(amount)).toString()
        OtherUser.credits = (BigInt(OtherUser.credits) - BigInt(amount)).toString()
        User.save(); OtherUser.save()

        bot.users.get(theUser.id).getDMChannel().then(response => bot.createMessage(response.id, ":dove: الحق عمرك دراهمك انزرفت من قبل: " + message.member.mention)).catch(err => { return false })

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
            ctx.arc(59 + 158 / 2, 46 + 158 / 2, 158 / 2, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(avatar, 59, 46, 158, 158);
            ctx.restore();
        })
        await Canvas.loadImage(message.member.avatarURL).then(avatar => {
            ctx.save();
            ctx.beginPath();
            ctx.arc(484 + 158 / 2, 46 + 158 / 2, 158 / 2, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(avatar, 484, 46, 158, 158);
            ctx.restore();
        })

        ctx.font = 'bold 30px Sans';
        ctx.fillStyle = Settings?.tcolor ?? 'white';
        ctx.textAlign = 'center';
        ctx.fillText('$ ' + bot.format(amount), 355, 196);

        return ['**:moneybag: $' + bot.format(amount) + '\n:dollar: $' + bot.format(User.credits) + '**', { name: 'robbery.png', file: canvas.toBuffer('image/png') }]
    }
}