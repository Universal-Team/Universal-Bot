// Setup vars
const Discord = require('discord.js');
const ConsoleFS = require('consolefs');
function cloneDB(UnivBot, id) {
  var db = UnivBot.db.default;
  db = JSON.stringify(db);
  db = JSON.parse(db);
  if (!UnivBot.db[id]) {
    UnivBot.db[id] = db;
    ConsoleFS.write.JSON(UnivBot.db, './database.json');
  };
};

function isOnDB(UnivBot, id) {
  var db = UnivBot.db;
  var keys = Object.keys(db);
  var result = keys.filter(ID => ID == id).length
  if (!result)
    result = false;
  if (result <= 1)
    result = true;
  return result;
};

function isDev(UnivBot, user) {
  let id = user.id;
  let db = UnivBot.db;
  if (db.developers.includes(id))
      return true;
  return false;
};

module.exports = (UnivBot, guild) => {
  
  // Create config if it doens't exists
  cloneDB(UnivBot, guild.id);
  
  // Update guilds
  var status = UnivBot.client.guilds.size+' Servers | ?help';
  if (UnivBot.client.guilds.size == 1)
    status = UnivBot.client.guilds.size+' Server | ?help';
  UnivBot.client.user.setActivity(status, {
    type: 'WATCHING'
  })
  
};