const { bot, settings, user } = require(process.cwd());

bot.on('messageCreate', async message => {
    if (message.author.bot || !message.member || message.member.guild.id !== bot.config.guild)
        return;

    const [cmd, ...args] = message.content.trim().split(/ +/g);

    let command = bot.commands.get(cmd)
    if (!command)
        return;

    let cooldown = bot.cooldown.check(message.member.id, cmd)
    if (cooldown)
        return await message.channel.createMessage('**:hourglass: تعال بعد \`' + cooldown + '\`**')

    let Settings = await settings.findOne({ guildId: message.guildID, botId: bot.user.id })
    if (!Settings)
        Settings = await new settings({ guildId: message.guildID, botId: bot.user.id })

    if (message.channel.id !== Settings.channel)
        if (!command.command?.admin)
            return true

    let User = await user.findOne({ guildId: message.guildID, botId: bot.user.id, userId: message.member.id })
    if (!User)
        User = await new user({ guildId: message.guildID, botId: bot.user.id, userId: message.member.id })

    try {
        let response = await command.execute(message, args, { cmd, Settings, User })
        if (response) {
            if (Array.isArray(response))
                return await message.channel.createMessage(response[0], response[1])
            await message.channel.createMessage(response)
        }
    } catch (err) {
        console.log(err)
        await message.channel.createMessage('**:x: حدث خطأ ما**')
    }

})