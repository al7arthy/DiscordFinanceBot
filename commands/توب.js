const { bot, user, handleColors } = require(process.cwd())

module.exports = {
    command: {
        name: 'توب',
        aliases: ['حرامية', 'حراميه'],
        showOnTimes: true,
        cooldown: 1000
    },
    execute: async (message, args, { Settings, User, cmd }) => {

        let con = cmd == 'توب'
        const topUsers = await user.find().sort(con ? { credits: -1 } : { stolen: -1 }).limit(10).exec();
        if (!topUsers || topUsers.length === 0)
            return 'محد له بالدراهم'

        let text = '**' + (con ? ':money_mouth: اغنى الاشخاص بالسيرفر' : ':moneybag: قائمة حرامية السيرفر') + '\n' + topUsers.map((user, index) => '#' + index + ' <@' + user.userId + '> :dollar: \`$' + bot.format(user[con ? 'credits' : 'stolen']) + '\`').join('\n') + '**'

        let content = {
            embeds: [{
                author: {
                    name: message.member.guild.name,
                    icon_url: message.member.guild.iconURL
                },
                color: parseInt(Settings.ecolor.slice(1) ?? 'ff5733', 16),
                description: text,
                footer: {
                    text: message.member.username,
                    icon_url: message.member.avatarURL
                },
                timestamp: new Date()
            }]
        }

        return content

        // bot.cooldown.add(message.member.id, module.exports.command.name, module.exports.command.cooldown);
        // return [content, Settings.image ? { name: 'luck.png', file: canvas.toBuffer('image/png') } : false]
    }
}