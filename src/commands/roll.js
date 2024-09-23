const { EmbedBuilder } = require("discord.js");
const prefix = require('../config/config.json');
const throwdice = () => Math.floor(Math.random() * 6) + 1;

module.exports.details = {
  name: 'roll',
  description: 'Rolls a dice (6-sided).',
  author: 'LachlanDev#8014',
  icon: 'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
  usage: `${prefix.prefix}roll`
};

module.exports.execute = (client, message, args) => {
  const result = throwdice();
  
  const embed = new EmbedBuilder()
    .setColor('#b434eb')
    .setTitle('Dice Roll Result')
    .setDescription(`The Number is: \`\`${result}\`\``)
    .setFooter({ text: "Made by LachlanDev#8014", iconURL: "https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe" });

  message.channel.send({ embeds: [embed] });
};
