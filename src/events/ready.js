const chalk = require("chalk")
const config = require("../config/config.json")
const vers = require("../config/version.json")
const discord = require('../bot')
var figlet = require('figlet');
const lolcatjs = require('lolcatjs');

module.exports = (client) => {
    console.clear()
    var banner = figlet.textSync('Discord BOT Dashboard V2', {
        font: 'Small',
        horizontalLayout: 'default',
        width: 1000,
        whitespaceBreak: true
    });
    lolcatjs.fromString(banner);
    console.log(chalk.bold.green('Launched Succesfully...'))
    console.log(chalk.magenta('Version:'),chalk.cyan(`${vers.ver}`))
    console.log(chalk.magenta('Made by:'),chalk.cyan('LachlanDev#8014'))
    console.log(chalk.magenta('Prefix:'),chalk.cyan(`${config.prefix}\n`))
    console.log(chalk.green(chalk.bold(`${discord.client.user.username}`),`is online!`))
    console.log(chalk.green(chalk.bold(`Dashboard:`),`http://localhost:`+config.port))

}