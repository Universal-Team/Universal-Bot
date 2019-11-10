// ===========================================================
// Setup variables
// ===========================================================
const Discord = require('discord.js');

// ===========================================================
// Client
// ===========================================================
const UnivBot = {
  client: new Discord.Client()
};
UnivBot.db = require('./database.json');
UnivBot.client.login(process.env['TOKEN']);

// ===========================================================
// Handle the events
// ===========================================================
UnivBot.client.on('ready', () => require('/app/events/ready')(UnivBot));
UnivBot.client.on('message', msg => require('/app/events/message')(UnivBot, msg));
UnivBot.client.on('messageUpdate', (orgMsg, msg) => require('/app/events/message')(UnivBot, msg));
UnivBot.client.on('guildCreate', guild => require('/app/events/guildCreate')(UnivBot, guild));
UnivBot.client.on('guildDelete', guild => require('/app/events/guildDelete')(UnivBot, guild));
UnivBot.client.on('guildMemberAdd', member => require('/app/events/guildMemberAdd')(UnivBot, member));
UnivBot.client.on('guildMemberRemove', member => require('/app/events/guildMemberRemove')(UnivBot, member));