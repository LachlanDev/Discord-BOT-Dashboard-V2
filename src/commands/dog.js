const { EmbedBuilder } = require("discord.js");
const prefix = require('../config/config.json');
const fetch = require("node-fetch");

module.exports.details = {
    name: 'dog',
    author: 'LachlanDev#8014',
    icon: 'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'Sends a random image of a dog.',
    usage: `${prefix.prefix}dog`
};

module.exports.execute = async (client, message, args) => {
    const uri = "https://dog.ceo/api/breeds/image/random";
    try {
        const response = await fetch(uri);
        const json = await response.json();

        const dogEmbed = new EmbedBuilder()
            .setColor('#b434eb')
            .setTitle('Dog')
            .setImage(json.message)
            .setFooter({ text: "Made by LachlanDev#8014", iconURL: "https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe" });

        await message.channel.send({ embeds: [dogEmbed] });
    } catch (error) {
        console.error(error);
        message.channel.send('Sorry, I could not fetch a dog image at this time.');
    }
};
