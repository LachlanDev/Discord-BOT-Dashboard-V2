const express = require('express');
const router = express.Router();
const discord = require('../bot')
const { ensureAuthenticated, forwardAuthenticated } = require('../auth/auth');
const config = require('../config/config.json')
const version = require('../config/version.json')

json = require('json-update');
const jsonfile = require('jsonfile')
const file = "./config/config.json"


router.get('/settings', ensureAuthenticated,(req, res) => {
    var config = jsonfile.readFileSync(file);
    res.render('home/settings',{
        profile:req.user,
        client:discord.client,
        config:config,
        version:version
    })
})

router.post('/settings/config',ensureAuthenticated,(req,res) =>{
    json.update('./config/config.json',{clientID:`${req.body.clientID}`,clientSecret:`${req.body.clientSecret}`,callbackURL:`${req.body.callbackURL}`,Admin:req.body.admin.split(','),token:`${req.body.token}`,prefix:`${req.body.prefix}`}).then(function(dat) { 
        req.flash('success', 'Config Updated please now restart the application!')
        res.redirect('/settings')
    })
})
  
module.exports = router;
