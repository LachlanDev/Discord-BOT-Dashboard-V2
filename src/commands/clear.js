const { EmbedBuilder } = require("discord.js");
const prefix = require('../config/config.json');

module.exports.details = {
    name: 'clear',
    author: 'LachlanDev#8014',
    icon: 'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'Clears messages from a channel.',
    usage: `${prefix.prefix}clear {amount}`
};

module.exports.execute = async (client, message, args) => {
    const { member } = message;
    const tag = `<@${member.id}>`;

    if (message.guild.members.me.permissions.has('ManageMessages')) {
        if (member.permissions.has("ManageMessages")) {
            let deleteAmount;

            if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
                return message.reply('Please indicate the number!');
            }

            if (parseInt(args[0]) > 100) {
                return message.reply('You can only delete 100 messages at a time!');
            } else {
                deleteAmount = parseInt(args[0]);
                const deletedMessages = await message.channel.bulkDelete(deleteAmount, true);
                const successEmbed = new EmbedBuilder()
                    .setColor('#b434eb')
                    .setTitle('Messages have been deleted')
                    .setDescription(`**Successfully removed** ${deletedMessages.size} messages.`)
                    .setFooter({ text: "Made by LachlanDev#8014", iconURL: "https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe" });

                await message.channel.send({ embeds: [successEmbed] });
            }
        } else {
            message.channel.send(`${tag} you don't have permission.`);
        }
    } else {
        message.channel.send(`${tag} Sorry, I don't have permission to manage messages!`);
    }
};
