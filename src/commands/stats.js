const discord = require ("discord.js");
const prefix = require('../config/config.json')
const moment = require("moment");
require("moment-duration-format");
const dateformat = require('dateformat');

module.exports.run = (client, message, args) =>{
    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    const info = new discord.MessageEmbed()
    .setColor('#b434eb')
    .setThumbnail(client.user.avatarURL())
    .setTitle(`${client.user.username} - Stats`)
    .addField("Username", `${client.user.username}#${client.user.discriminator}`)
    .addField("Server Count", `${client.guilds.cache.size}`)
    .addField("Uptime", duration)
    .addField("Response Time", `${Math.round(client.ws.ping)}ms`)
    .addField("Creation Date", dateformat(`${client.user.createdAt}`, 'dddd, mmmm dS, yyyy, h:MM TT'))
    .setFooter("Made by LachlanDev#8014", "https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe")
    message.channel.send({embed: info })
}

module.exports.details = {
    name:'Stats',
    author:'LachlanDev#8014',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description:'Statistics your BOT.',
    usage:`${prefix.prefix}stats`
}