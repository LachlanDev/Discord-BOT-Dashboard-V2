const { EmbedBuilder } = require("discord.js");
const prefix = require('../config/config.json');

module.exports.details = {
    name: 'Ban',
    author: 'LachlanDev#8014',
    icon: 'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'Bans a user from the server.',
    usage: `${prefix.prefix}ban {@user}`
};

module.exports.execute = async (client, message, args) => {
    const { member, mentions } = message;
    const tag = `<@${member.id}>`;

    // Проверяем, есть ли у бота разрешения
    if (!message.guild.me || !message.guild.me.permissions.has('BAN_MEMBERS')) {
        return message.channel.send(`${tag} Sorry, I don't have permission to ban users!`);
    }

    // Проверяем, есть ли у пользователя разрешения
    if (!member.permissions.has('ADMINISTRATOR') && !member.permissions.has('BAN_MEMBERS')) {
        return message.channel.send(`${tag} You don't have permission.`);
    }

    const target = mentions.users.first();
    if (target) {
        const targetMember = message.guild.members.cache.get(target.id);
        try {
            await targetMember.ban();
            const banEmbed = new EmbedBuilder()
                .setColor('#e6350e')
                .setTitle('User banned')
                .addFields(
                    { name: 'User', value: `${target} has been banned from the server!` },
                    { name: 'Moderator', value: `${member}` }
                )
                .setThumbnail(target.displayAvatarURL())
                .setFooter({ text: 'Made by LachlanDev#8014', iconURL: 'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe' });

            await message.channel.send({ embeds: [banEmbed] });
        } catch (error) {
            console.error(error);
            message.channel.send(`${tag} An error occurred while trying to ban this user.`);
        }
    } else {
        message.channel.send(`${tag} Please specify the user!`);
    }
};
