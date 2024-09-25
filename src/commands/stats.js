const { EmbedBuilder } = require('discord.js');
const prefix = require('../config/config.json');
const moment = require("moment");
require("moment-duration-format");
const dateformat = require('dateformat');

module.exports.details = {
    name: 'Stats',
    author: 'LachlanDev#8014',
    icon: 'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'Statistics about your BOT.',
    usage: `${prefix.prefix}stats`
};

module.exports.execute = (client, message, args) => {
    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    const infoEmbed = new EmbedBuilder()
        .setColor('#b434eb')
        .setThumbnail(client.user.displayAvatarURL())
        .setTitle(`${client.user.username} - Stats`)
        .addFields(
            { name: "Username", value: `${client.user.username}#${client.user.discriminator}` },
            { name: "Server Count", value: `${client.guilds.cache.size}` },
            { name: "Uptime", value: duration },
            { name: "Response Time", value: `${Math.round(client.ws.ping)}ms` },
            { name: "Creation Date", value: dateformat(client.user.createdAt, 'dddd, mmmm dS, yyyy, h:MM TT') }
        )
        .setFooter({ text: "Made by LachlanDev#8014", iconURL: "https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe" });

    message.channel.send({ embeds: [infoEmbed] });
};
