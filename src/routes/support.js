const express = require('express');
const router = express.Router();
const discord = require('../bot')
const { ensureAuthenticated, forwardAuthenticated } = require('../auth/auth');
const themes = "./config/theme.json"
const jsonfile = require('jsonfile')

router.get('/support', ensureAuthenticated,(req, res) => {
    var theme = jsonfile.readFileSync(themes);
    res.render('home/support',{
        profile:req.user,
        client:discord.client,
        theme:theme
    })
})

module.exports = router;
