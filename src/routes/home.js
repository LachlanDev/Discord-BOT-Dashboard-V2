const express = require('express');
const router = express.Router();
const discord = require('../bot')
const { ensureAuthenticated, forwardAuthenticated } = require('../auth/auth');
const dateformat = require('dateformat');
const config = require('../config/config.json')
const ver = require('../config/version.json')

const number = require('easy-number-formatter')
var request = require("request");

router.get('/', ensureAuthenticated,(req,res) =>{
    res.redirect('/home')
})

router.get('/home', ensureAuthenticated,(req, res) => {
    var options = {
        method: 'GET',
        url: `https://lachlan-dev.com/version/dbdv2.txt`,
        headers: {
          'User-Agent': 'Discord-Bot-Dashboard',
          useQueryString: true
        }
      }
      // Prase update request data to JSON.
      request(options, function (error, response, body) {
        try 
        {
          jsonprased = JSON.parse(body)
          verL = jsonprased.ver
        } 
        catch (e) 
        {
          console.log(chalk.red("Failed to check for updates you may continue using this version, please try again or contact LachlanDev#8014"))
          verL = ver.ver
        }
    res.render('home/home',{
        profile:req.user,
        client:discord.client,
        joinedDate:dateformat(`${discord.client.user.createdAt}`, 'dddd, mmmm dS, yyyy, h:MM TT'),
        prefix:config.prefix,
        number:number,
        Latestversion:verL,
        Currentversion:ver.ver
    })
    })
})

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Logged out');
    res.redirect('/login');
  });
  
module.exports = router;
