const { bot, user } = require(process.cwd());

module.exports = {
    command: {
        name: 'وقت',
        aliases: ['الوقت', 'اوقات'],
    },
    execute: async (message) => {
        const commands = bot.commands.filter(cmd => cmd.command.showOnTimes);
        const cooldowns = bot.cooldown.list(message.member.id);

        const uniqueCommands = new Set();
        const list = commands.reduce((acc, cmd) => {
            const sub = cmd.command.name;

            if (!uniqueCommands.has(sub)) {
                uniqueCommands.add(sub);

                if (cooldowns[sub]) {
                    const remaining = cooldowns[sub] - Date.now();
                    if (remaining > 0) {
                        const hours = Math.floor(remaining / (1000 * 60 * 60));
                        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
                        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

                        let timeString = '';
                        if (hours > 0) timeString += `${hours} ساعات `;
                        if (hours > 0 || minutes > 0) timeString += `${minutes} دقائق `;
                        timeString += `${seconds} ثانية`;

                        acc.push(`> ${sub} : \` ⌛ ${timeString}\``);
                    } else
                        acc.push(`> ${sub} : جاهز للعب`);
                } else
                    acc.push(`> ${sub} : جاهز للعب`);
            }

            return acc;
        }, []);

        return {
            embeds: [{
                thumbnail: { url: message.channel.guild.iconURL },
                title: 'قائمة الوقت',
                description: '**' + list.join('\n') + '**',
                footer: {
                    text: message.member.username,
                    icon_url: message.member.avatarURL
                },
                timestamp: new Date()
            }]
        };
    }
};
