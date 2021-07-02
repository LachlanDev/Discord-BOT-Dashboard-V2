const discord = require ("discord.js");
const prefix = require('../config/config.json')
const throwdice = () => ~~(Math.random() * 6) + 1;

module.exports.run = (client, message, args) =>{
    message.channel.send("The Number is "+"``"+throwdice()+"``")
}

module.exports.details = {
    name:'Roll',
    author:'LachlanDev#8014',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description:' Roles a dice (6-Sided).',
    usage:`${prefix.prefix}roll`
}