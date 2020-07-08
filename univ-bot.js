// ===========================================================
// Setup variables
// ===========================================================
const fs = require('fs');
const Discord = require('discord.js');
require('./utils/Prototypes');
require('dotenv').config();

// ===========================================================
// Client
// ===========================================================
const UnivBot = { client: new Discord.Client() };
UnivBot.db = require('./database.json');
UnivBot.client.login(process.env['TOKEN']);

// ===========================================================
// Handle the events
// ===========================================================
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    UnivBot.client.on(eventName, event.bind(null, UnivBot));
  });
});
