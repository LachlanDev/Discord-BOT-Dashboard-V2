const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
json = require('json-update');

const client = new Discord.Client();
const config = require('./config/config.json')
const settings = require('./config/settings.json')
client.commands = new Enmap();
chalk = require('chalk');
client.config = config;

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();


fs.readdir("./commands/", (err, files) => {
  console.log(chalk.red('Loading Commands...'))
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    if (settings.includes(commandName)) return;
    console.log(chalk.green(`[+] ${commandName}`));
    client.commands.set(commandName, props);
  });
});

client.on("ready", () => {
  client.user.setActivity('Set Activity', { type: 'WATCHING' });
});

client.login(config.token)

exports.client = client;
