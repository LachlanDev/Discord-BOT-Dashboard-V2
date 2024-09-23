const { EmbedBuilder } = require('discord.js');
const dateformat = require('dateformat');
const prefix = require('../config/config.json');

module.exports.details = {
    name: 'userinfo',
    author: 'LachlanDev#8014',
    icon: 'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'Sends information about a given user.',
    usage: `${prefix.prefix}userinfo {@user}`
};

module.exports.execute = (client, message, args) => {
    const member = message.mentions.members.last() || message.guild.members.cache.get(args[0]) || message.member;

    const infoEmbed = new EmbedBuilder()
        .setColor('#b434eb')
        .setThumbnail(member.user.displayAvatarURL())
        .setTitle(`User Info - ${member.user.username}`)
        .addFields(
            { name: "Username", value: `${member.user.username}#${member.user.discriminator}`, inline: true },
            { name: "ID", value: `${member.user.id}`, inline: true },
            { name: "Account Creation", value: dateformat(member.user.createdAt, 'dddd, mmmm dS, yyyy') },
            { name: "Joined Server", value: dateformat(member.joinedAt, 'dddd, mmmm dS, yyyy') },
            { name: 'Roles', value: member.roles.cache.map(r => `${r}`).join(' | ') || 'None', inline: true }
        )
        .setFooter({ text: 'Made by LachlanDev#8014', iconURL: 'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe' });

    message.channel.send({ embeds: [infoEmbed] });
};
