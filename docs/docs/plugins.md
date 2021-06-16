# Creating Plugins
Discord BOT Dashboard allows for custom plugins to be installed within your application, this documentation section will hopefully help you understand how you can create your own plugins.

### 📁 Code Structure
Having a basic understand of Discord BOT Command Development will allow you to understand this easier. Below is the code all Plugins have to follow, very simular to most BOT's which use a command handler.
```javascript
// Requirements
const discord = require ("discord.js");
// Required display prefix
const prefix = require('../config/config.json')

// All the code for you Plugin goes inside here
module.exports.run = (client, message, args) =>{
    message.channel.send ('pong!')
}

// IMPORTANT Allows DBD to know details about your Plugin
module.exports.details = {
    name:'Ping',
    author:'LachlanDev#8014',
    icon:'URL',
    description:'ping command description',
    usage:`${prefix.prefix}ping`
}
```
Want to learn more about Discord BOT Development you can check out my guide [here](https://blog.lachlan-dev.com/discord-bot-development-basics/).