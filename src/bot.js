const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const chalk = require('chalk');
const commands = require('./commands/index');

const { GatewayIntentBits } = require('discord.js');

const client = new Discord.Client({
  intents: [
    GatewayIntentBits.Guilds, // Access to guilds (servers)
    GatewayIntentBits.GuildMembers, // Access to guild members
    GatewayIntentBits.GuildBans, // Access to user bans
    GatewayIntentBits.GuildEmojisAndStickers, // Access to emojis and stickers
    GatewayIntentBits.GuildIntegrations, // Access to integrations
    GatewayIntentBits.GuildWebhooks, // Access to webhooks
    GatewayIntentBits.GuildInvites, // Access to invitations
    GatewayIntentBits.GuildVoiceStates, // Access to voice channels and user states
    GatewayIntentBits.GuildPresences, // Access to presence statuses (online/offline)
    GatewayIntentBits.GuildMessages, // Access to guild messages
    GatewayIntentBits.GuildMessageReactions, // Access to guild message reactions
    GatewayIntentBits.GuildMessageTyping, // Access to typing indicators
    GatewayIntentBits.DirectMessages, // Access to direct messages (Direct Messages)
    GatewayIntentBits.DirectMessageReactions, // Access to direct message reactions
    GatewayIntentBits.DirectMessageTyping, // Access to typing indicators in direct messages
    GatewayIntentBits.MessageContent, // Access to message content
    GatewayIntentBits.GuildScheduledEvents, // Access to scheduled guild events
    GatewayIntentBits.AutoModerationConfiguration, // Access to automatic moderation configuration
    GatewayIntentBits.AutoModerationExecution // Access to automatic moderation rules execution moderation
  ]
});

const config = require('./config/config.json');
const settings = require('./config/settings.json');
client.commands = new Enmap();
client.config = config;

// Loading events
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

// Loading commands
Object.keys(commands).forEach(commandName => {
  let props = commands[commandName];
  if (settings.includes(commandName)) return;
  console.log(chalk.green(`[+] Loaded command: ${commandName}`));
  console.log(`Loading command from ${__filename}`);


  try {
      client.commands.set(commandName, props);
  } catch (error) {
      console.error(`Error loading command ${commandName}: ${error}`);
  }
});

// Command processing
client.on('messageCreate', message => {
  if (message.author.bot) return; // Ignore the bots
  if (!message.content.startsWith(config.prefix)) return; // Prefix check

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);

  if (!command) {
    console.error(`Command ${commandName} not found`);
    return;
  }

  // Checking for the presence of the execute function
  if (typeof command.execute !== 'function') {
    console.error(`Command ${commandName} does not have an execute function`);
    return;
  }

  try {
    // Pass the client, message and arguments
    command.execute(client, message, args);
  } catch (error) {
    console.error(`Error executing command: ${error}`);
    message.reply('There was an error trying to execute that command!');
  }
});

// Когда бот готов
client.on("ready", () => {
  client.user.setActivity('Set Activity', { type: 'WATCHING' });
});

client.login(config.token);

exports.client = client;
