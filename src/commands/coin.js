const discord = require ("discord.js");
const prefix = require('../config/config.json')

module.exports.run = (client, message, args) =>{
    function flip(){
        var rand = ['Heads!', 'Tails!'];
        return rand[Math.floor(Math.random()*rand.length)];
    }
    message.channel.send(flip())
}

module.exports.details = {
    name:'Coin Flip',
    author:'LachlanDev#8014',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description:'Simple coin flip command',
    usage:`${prefix.prefix}coin`
}