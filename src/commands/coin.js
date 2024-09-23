const { EmbedBuilder } = require("discord.js");
const prefix = require('../config/config.json');

module.exports.details = {
    name: 'coin',
    author: 'LachlanDev#8014',
    icon: 'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'Simple coin flip command',
    usage: `${prefix.prefix}coin`
};

module.exports.execute = async (client, message, args) => {
    const flip = () => {
        const rand = ['Heads!', 'Tails!'];
        return rand[Math.floor(Math.random() * rand.length)];
    };

    const resultEmbed = new EmbedBuilder()
        .setColor('#b434eb')
        .setTitle('Coin Flip Result')
        .setDescription(`The result is: \`\`${flip()}\`\``)
        .setFooter({ text: "Made by LachlanDev#8014", iconURL: "https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe" });

    await message.channel.send({ embeds: [resultEmbed] });
};
