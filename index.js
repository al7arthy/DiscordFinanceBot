const Eris = require("eris");
const path = require('path');
const mongoose = require('mongoose');
const config = require(path.join(process.cwd(), 'config.json'));
const cooldown = require(path.join(process.cwd(), 'modules', 'cooldown'));

const bot = new Eris(config.token);
bot.cooldown = cooldown
bot.commands = new Eris.Collection();
bot.config = config
bot.format = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

module.exports.bot = bot

const cmdHandler = require(path.join(process.cwd(), 'modules', 'cmdHandler'));
module.exports.cmdHandler = cmdHandler
module.exports.user = require(path.join(process.cwd(), 'schemas', 'user'))
module.exports.settings = require(path.join(process.cwd(), 'schemas', 'settings'))
module.exports.handleColors = require(path.join(process.cwd(), 'modules', 'handleColors'))

bot.on("ready", async () => {
    await cmdHandler.loadCommands()
    await require(path.join(process.cwd(), 'events', 'messageCreate'));
    console.log("\x1b[47m * \x1b[0m", "Discord : Ready!");
});

mongoose.connect('mongodb://localhost:27017/LancerStore').then(() => {
    console.log("\x1b[47m * \x1b[0m", "Database: Ready!");
    bot.connect();
})