module.exports = (UnivBot, guild) => {
  
  // Update guilds
  var status = UnivBot.client.guilds.size+' Servers | ?help';
  if (UnivBot.client.guilds.size == 1)
    status = UnivBot.client.guilds.size+' Server | ?help';
  UnivBot.client.user.setActivity(status, {
    type: 'WATCHING'
  });
  
};