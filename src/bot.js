const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const isDocker = require('is-docker');
json = require('json-update');

// Check if we are running in a docker container
if (isDocker()) {
  if(!process.env.clientID) { 
    console.log('clientID not set, exiting');
    process.exit(1);
  }
  else if(!process.env.clientSecret) { 
    console.log('clientSecret not set, exiting');
    process.exit(1);
  }
  else if(!process.env.callBackURL) { 
    console.log('callBackURL not set, exiting');
    process.exit(1);
  }
  else if(!process.env.admin) { 
    console.log('admin not set, exiting');
    process.exit(1);
  }
  else if(!process.env.token) { 
    console.log('token not set, exiting');
    process.exit(1);
  }
  else if(!process.env.prefix) { 
    console.log('prefix not set, exiting');
    process.exit(1);
  }else{
    fs.rename('./config/config.default.json', './config/config.json', function(err) {
        if ( err ) console.log('ERROR: ' + err);
    });
    json.update('./config/config.json',{clientID:`${process.env.clientID}`,clientSecret:`${process.env.clientSecret}`,callbackURL:`${process.env.callBackURL}`,Admin:process.env.admin.split(','),token:`${process.env.token}`,prefix:`${process.env.prefix}`}).then(function(dat) { 
      console.log("Config Updated inside docker container!");
    })
  }
}

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
