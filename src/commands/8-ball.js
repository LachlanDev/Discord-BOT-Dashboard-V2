const discord = require ("discord.js");
const prefix = require('../config/config.json')
const fetch = require("node-fetch");

module.exports.run = (client, message, args) =>{
    if(args == ""){
        message.channel.send("Please ask a question.")
    } 
    else{
        let uri = "https://8ball.delegator.com/magic/JSON/" + args;
        fetch(uri)
            .then(response => response.json())
            .then(json => {
            message.channel.send(json.magic.answer)
        });
    }
}

module.exports.details = {
    name: '8-Ball',
    author: 'LachlanDev#8014',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'Ask the 8-Ball a question!',
    usage:`${prefix.prefix}8-ball {question}`
}