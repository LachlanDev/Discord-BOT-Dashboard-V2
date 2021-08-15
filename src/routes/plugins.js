const express = require('express');
const router = express.Router();
const discord = require('../bot')
const { ensureAuthenticated, forwardAuthenticated } = require('../auth/auth');
var commands = require("../commands");
const fs = require("fs");
const fileUpload = require('express-fileupload');
const jsonfile = require('jsonfile')
json = require('json-update');
const themes = "./config/theme.json"

router.get('/plugins', ensureAuthenticated,(req, res) => {
  var theme = jsonfile.readFileSync(themes);
    const commandsToggle = jsonfile.readFileSync('./config/settings.json');
    fs.readdir("./commands/", (err, files) => {
    res.render('home/plugins',{
        profile:req.user,
        client:discord.client,
        commands:commands,
        commandName:files,
        commandsToggle:commandsToggle,
        theme:theme
    })
})
});

router.post('/plugins/remove/:plugin', ensureAuthenticated,function(req,res) {
  try {
    fs.unlinkSync('./commands/'+req.params.plugin)
    req.flash('success', `Plugin ${req.params.plugin} was successfully removed!` )
    res.redirect('/plugins')
  } catch(err) {
    console.error(err)
  }
})

router.post('/plugins/toggle', ensureAuthenticated,function(req, res) {
  // Remove plugin from settings file
  if(req.body.toggle == "true"){
    fs.readFile('./config/settings.json', function (err, data) {
      var json = JSON.parse(data);
      if(!json.includes(req.body.commandName)){
        return req.flash('error', `Error`), 
        res.redirect('/plugins')
      }
      json.splice(json.indexOf(`${req.body.commandName}`),1);    
      fs.writeFile("./config/settings.json", JSON.stringify(json), function(err){
        if (err) throw err;
        res.redirect('/plugins')
      });
  })
  }

  // Add plugin to settings file
  if(req.body.toggle == "false"){
    fs.readFile('./config/settings.json', function (err, data) {
      var json = JSON.parse(data);
      if(json.includes(req.body.commandName)){
        return req.flash('error', `Error`), 
        res.redirect('/plugins')
      }
      json.push(`${req.body.commandName}`);    
      fs.writeFile("./config/settings.json", JSON.stringify(json), function(err){
        if (err) throw err;
        res.redirect('/plugins')
      });
  })
  }
});

router.post('/plugins/upload', ensureAuthenticated,function(req, res) {
    let sampleFile;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return req.flash('error', `No file was uploaded, please try again!`), 
      res.redirect('/plugins')
    }
    if(!req.files.sampleFile.name.endsWith(".js")){
      return req.flash('error', `Please only upload Javascript files!`), 
      res.redirect('/plugins')
    }
    const path = './commands/' + req.files.sampleFile.name
    if(fs.existsSync(path)) {
      return req.flash('error', `Plugin with that name already exists!`), 
      res.redirect('/plugins')
    }

    sampleFile = req.files.sampleFile;
    uploadPath = './commands/' + sampleFile.name;
  
    sampleFile.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err);
  
        req.flash('success', `Plugin ${sampleFile.name} successfully uploaded, please now restart Discord BOT Dashboard for changes to take effect!`)
        res.redirect('/plugins')
    });
  });

module.exports = router;
