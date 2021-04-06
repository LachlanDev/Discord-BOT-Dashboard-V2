const express = require('express');
const router = express.Router();
const discord = require('../bot')
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const dateformat = require('dateformat');

router.get('/', ensureAuthenticated,(req,res) =>{
    res.redirect('/home')
})

router.get('/home', ensureAuthenticated,(req, res) => {
    res.render('home/home',{
        profile:req.user,
        client:discord.client,
        joinedDate:dateformat(`${discord.client.user.createdAt}`, 'dddd, mmmm dS, yyyy, h:MM TT')
    })
})

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Logged out');
    res.redirect('/login');
  });
  
module.exports = router;
