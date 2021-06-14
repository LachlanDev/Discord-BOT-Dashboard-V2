// Please leave this file, this is used to import all commands!
var normalizedPath = require("path").join(__dirname, "../commands");

require("fs").readdirSync(normalizedPath).forEach(function(file) {
var name = file.replace('.js', '');
  exports[name] = require("../commands/" + file);
});