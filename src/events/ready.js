const chalk = require("chalk");
const config = require("../config/config.json");
const vers = require("../config/version.json");
const discord = require('../bot');
const figlet = require('figlet');
const lolcatjs = require('lolcatjs');

module.exports = (client) => {
    console.clear();

    // Создание баннера
    const banner = figlet.textSync('Discord BOT Dashboard V2', {
        font: 'Small',
        horizontalLayout: 'default',
        width: 1000,
        whitespaceBreak: true
    });
    lolcatjs.fromString(banner);

    // Логирование информации о запуске
    console.log(chalk.bold.green('Launched Successfully...'));
    console.log(chalk.magenta('Version:'), chalk.cyan(`${vers.ver}`));
    console.log(chalk.magenta('Made by:'), chalk.cyan('LachlanDev#8014'));
    console.log(chalk.magenta('Prefix:'), chalk.cyan(`${config.prefix}\n`));

    // Проверка, что клиент и user определены
    if (client.user) {
        console.log(chalk.green(chalk.bold(`${client.user.username}`), `is online!`));
    } else {
        console.error(chalk.red('Error: Client user is undefined.'));
    }

    console.log(chalk.green(chalk.bold(`Dashboard:`), `http://localhost:` + config.port));
}
