const discord = require ("discord.js");
const prefix = require('../config/config.json')

module.exports.run = (client, message, args) =>{
    const {member, mentions } = message
    const tag = `<@${member.id}>`
    if(message.guild.me.hasPermission('MANAGE_MESSAGES')){
        if(member.hasPermission("MANAGE_MESSAGES")){
            let deleteAmount;
    
            if(isNaN(args[0]) || parseInt(args[0]) <= 0) {return message.reply('Please specify a number!')}
            if(parseInt(args[0]) > 100){
                message.reply('You can only delete 100 messages at a time!')
            }else{
                deleteAmount = parseInt(args[0])
                message.channel.bulkDelete(deleteAmount,true)
                message.reply(`**Sucessfully Deleted** ${deleteAmount} messages`)
            }
        }else{
            message.channel.send(`${tag} you dont have permission.`)
        }
    }else{
        message.channel.send(`${tag} Sorry I dont have permission to Manage Messages!`)
    }
}

module.exports.details = {
    name:'Clear',
    author:'LachlanDev#8014',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description:'Clears messages from a channel.',
    usage:`${prefix.prefix}clear {ammount}`
}