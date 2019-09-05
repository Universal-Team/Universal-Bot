// ===========================================================
// Setup client and variables
// ===========================================================
const ConsoleFS = require('consolefs');
const Discord = require('discord.js');
const UnivBot = {
  client: new Discord.Client()
};
ConsoleFS.read.ENV('./.env');
UnivBot.db = ConsoleFS.read.JSON('./database.json');
UnivBot.client.login(process.env['TOKEN']);
function send(string, config) {
  var reg = new RegExp(process.env['TOKEN'], 'i');
  if (typeof string == 'string')
    string = string.replace(reg, 'UnivBot.client.token');
  var message = this;
  if (message.guild) {
    message.channel.send(string, config);
  } else {
    message.author.send(string, config);
  };
};

// ===========================================================
// Create functions collection
// ===========================================================

// ===========================================================
// Detect if the bot loggued
// ===========================================================
UnivBot.client.on('ready', () => {
  console.log(UnivBot.client.user.tag+' is ready');
  UnivBot.client.user.setActivity("Booted!");
  setTimeout(function() { UnivBot.client.user.setActivity("for your .'s!", {type: 'WATCHING'}); }, 3000);
});

// ===========================================================
// Receive messages
// ===========================================================
UnivBot.client.on('message', msg => {
  
  // Create config if it doens't exists
  if (msg.guild)
    cloneDB(UnivBot, msg.guild.id);
  
  // Prevents bots from runinng commands
  if (msg.author.bot)
    return;
  
  // Checks for dev perms
  switch(isDev(UnivBot, msg.member)) {
    case true:
      msg.dev = true;
      break;
    case false:
      msg.dev = false;
      break;
  };
  
  // Call event
  msg.send = send;
  var event = require('./events/message');
  event(UnivBot, msg);
  
});

// ===========================================================
// Detect when the bot joins a server
// ===========================================================
UnivBot.client.on('guildCreate', guild => {
  
  // Create config if it doens't exists
  cloneDB(UnivBot, guild.id);
  
});

// ===========================================================
// Detect if a user joins and checks for db
// ===========================================================
UnivBot.client.on('guildMemberAdd', member => {
  
  // Create config if it doens't exists
  cloneDB(UnivBot, member.guild.id);
  
});

// ===========================================================
// Misc functions
// ===========================================================
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

function isDev(UnivBot, member) {
  let id = member.id;
  let db = UnivBot.db;
  if (db.developers.filter(devs => devs == id).length)
      return true;
  return false;
};