const { EmbedBuilder } = require("discord.js");
const prefix = require('../config/config.json');
const dateformat = require('dateformat');
const number = require('easy-number-formatter');

module.exports.details = {
  name: 'serverinfo',
  description: 'Sends information about the current server!',
  author: 'LachlanDev#8014',
  icon: 'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
  usage: `${prefix.prefix}serverinfo`
};

module.exports.execute = (client, message, args) => {
  const infoEmbed = new EmbedBuilder()
    .setColor('#b434eb')
    .setThumbnail(message.guild.iconURL())
    .setTitle(`Server Info - ${message.guild.name}`)
    .addFields(
      { name: "Server Name", value: `${message.guild.name}`, inline: true },
      { name: "Server Owner", value: `${message.guild.members.cache.get(message.guild.ownerId)}`, inline: true },
      { name: "ID", value: `${message.guild.id}` },
      { name: "Server Region", value: `${message.guild.region}` },
      { name: "Member Count", value: `${number.formatNumber(message.guild.memberCount)}` },
      { name: "Creation Date", value: dateformat(`${message.guild.createdAt}`, 'dddd, mmmm dS, yyyy') }
    )
    .setFooter({ text: "Made by LachlanDev#8014", iconURL: "https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe" });

  message.channel.send({ embeds: [infoEmbed] });
};
