const express = require('express');
const router = express.Router();
const discord = require('../bot')
const { ensureAuthenticated, forwardAuthenticated } = require('../auth/auth');

router.get('/support', ensureAuthenticated,(req, res) => {
    res.render('home/support',{
        profile:req.user,
        client:discord.client
    })
})

module.exports = router;
