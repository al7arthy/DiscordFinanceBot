
const { bot } = require(process.cwd())

const printCommandUsage = async (command) => {

    let result = {};
    let cmd = bot.commands[bot.commandAliases[command] || command];

    if (!cmd)
        return "لم اجد الامر";

    result.title = 'الأمر: ' + cmd.name
    result.description = cmd.fullDescription ?? cmd.description ?? 'بدون وصف'

    result.fields = []
    if (cmd.aliases)
        result.fields.push({ name: 'الاوامر البديلة', value: cmd.aliases.join(', '), inline: false })
    if (cmd.usage && Array.isArray(cmd.usage))
        result.fields.push({ name: 'طريقة الاستخدام', value: cmd.usage.map(usage => bot.config.prefix + cmd.name + ' ' + usage).join('\n'), inline: false })
    if (cmd.examples && Array.isArray(cmd.examples))
        result.fields.push({ name: 'مثال', value: cmd.examples.map(example => bot.config.prefix + cmd.name + ' ' + example).join('\n'), inline: false })

    result.color = 1133661

    return { embeds: [result] }
}

module.exports = {
    printCommandUsage: printCommandUsage,
    run: async (msg, args) => {
        if (!bot.config.owners.includes(msg.author.id))
            return;

        if (args.length > 0)
            return await printCommandUsage(args[0])
        else
            return {
                embeds: [{
                    title: "قائمة اوامر البوت",
                    description: Object.keys(bot.commands)
                        .map(name => '> ' + bot.config.prefix + name + ' - ' + bot.commands[name].description).join('\n'),
                    color: 1133661
                }],
                components: [{
                    type: 1,
                    components: [{
                        type: 3,
                        custom_id: 'editHelpMessage',
                        options: Object.keys(bot.commands).map(name => { return { name: name, description: bot.commands[name].description, value: name } }),
                        placeholder: "اختر الامر للمزيد من المعلومات"
                    }]
                }],
            };
    }
}