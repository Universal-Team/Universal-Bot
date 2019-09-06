var terminal = require('child_process').execSync;
const ConsoleFS = require('consolefs');

module.exports = {
  name: ['reboot','restart'],
  usage: '',
  desc: 'Reboots the bot',
  DM: true,
  permissions: [ 'DEV' ],
  
  exec(UnivBot, msg) {
    
    var prom = msg.send('Rebooting...')
    prom.then(message => {
      if (msg.guild)
        UnivBot.db.reboot = { msg: message.id, channel: message.channel.id, guild: message.guild.id, start: new Date().getTime() };
      if (!msg.guild)
        UnivBot.db.reboot = { msg: message.id, author: msg.author.id, start: new Date().getTime() };
      ConsoleFS.write.JSON(UnivBot.db, '/app/database.json');
      terminal('refresh');
    });
    
  }
};

