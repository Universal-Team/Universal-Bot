module.exports = (UnivBot, guild) => {
  
  // Update guilds
  var status = UnivBot.client.guilds.cache.size+' Servers | ?help';
  if (UnivBot.client.guilds.cache.size == 1)
    status = UnivBot.client.guilds.cache.size+' Server | ?help';
  UnivBot.client.user.setActivity(status, {
    type: 'WATCHING'
  });
  
};