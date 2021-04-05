const express = require('express');
const router = express.Router();
const discord = require('../bot')
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const passport = require('passport');

router.get('/', forwardAuthenticated, (req, res) => {
    res.render('login/login',{
        user:discord.client.user.username
    })
})

router.get('/api', forwardAuthenticated,(req,res, next)=>{
    passport.authenticate('discord', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
      })(req, res, next);
})

module.exports = router;
