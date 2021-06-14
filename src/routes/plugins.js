const express = require('express');
const router = express.Router();
const discord = require('../bot')
const { ensureAuthenticated, forwardAuthenticated } = require('../auth/auth');
var commands = require("../commands");
const fs = require("fs");

router.get('/plugins', ensureAuthenticated,(req, res) => {
    fs.readdir("./commands/", (err, files) => {
    res.render('home/plugins',{
        profile:req.user,
        client:discord.client,
        commands:commands,
        commandName:files
    })
})
});

module.exports = router;
