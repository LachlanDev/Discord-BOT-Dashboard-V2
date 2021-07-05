const discord = require ("discord.js");
const prefix = require('../config/config.json')

module.exports.run = (client, message, args) =>{
    const {member, mentions } = message

        const tag = `<@${member.id}>`
        if(message.guild.me.hasPermission('KICK_MEMBERS')){        
            if(
            member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('KICK_MEMBERS')){
                const target = mentions.users.first()
                if(target){
                    const targetMember = message.guild.members.cache.get(target.id)
                    targetMember.kick()
                    const kick = new discord.MessageEmbed()
                    .setColor('#eb9d17')
                    .setTitle(`User Kicked`)
                    .addField("User",`${target} was kicked from the server!`)
                    .addField("Moderator",`${member}`)
                    .setThumbnail(target.avatarURL())
                    .setFooter("Made by LachlanDev#8014", "https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe")
                    message.channel.send({embed: kick })
                }else{
                    message.channel.send(`${tag} please specify a user!`)
                }
            }else{
                message.channel.send(`${tag} you dont have permission.`)
            }
        }else{
            message.channel.send(`${tag} Sorry I dont have permission to Kick Members!`)
        }
}

module.exports.details = {
    name:'Kick',
    author:'LachlanDev#8014',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description:'Kicks a user from the server.',
    usage:`${prefix.prefix}kick {@user}`
}