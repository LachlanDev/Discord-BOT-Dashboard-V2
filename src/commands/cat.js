const discord = require ("discord.js");
const prefix = require('../config/config.json')
const fetch = require("node-fetch");

module.exports.run = (client, message, args) =>{
    let uri = "https://aws.random.cat/meow";
    fetch(uri)
    .then(response => response.json())
    .then(json => {
        const dog = new discord.MessageEmbed()
        .setColor('#b434eb')
        .setTitle('Cat')
        .setImage(json.file)
        .setFooter("Made by LachlanDev#8014", "https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe")
        message.channel.send({embed:dog})
    });
}

module.exports.details = {
    name:'Cat',
    author:'LachlanDev#8014',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description:'Sends a random image of a cat.',
    usage:`${prefix.prefix}cat`
}