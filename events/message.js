// Setup vars
const Discord = require('discord.js');
const ConsoleFS = require('consolefs');

// Event handler
module.exports = function(UnivBot, msg) {
  var db = UnivBot.db[msg.guild.id];
  msg.cmd = msg.content.replace(/\n/g, ' ').split(' ')[0].substr(db.prefix.length).toLowerCase();
  msg.args = msg.content.trim().substr(msg.cmd.length+db.prefix.length).trim();
  if (!msg.content.trim().startsWith(db.prefix))
    return;
  if (msg.dev && msg.cmd == 'eval')
    return require('/app/commands/Developers/eval.js').exec(UnivBot, msg);
  else if (msg.dev && msg.cmd == 'exec')
    return require('/app/commands/Developers/exec.js').exec(UnivBot, msg);
  else if (msg.cmd == 'role')
    return require('/app/commands/roles/role.js').exec(UnivBot, msg);
  else if (msg.cmd == 'release')
    return require('/app/commands/projects/release.js').exec(UnivBot, msg);
  else if (msg.cmd == 'nightly')
    return require('/app/commands/projects/nightly.js').exec(UnivBot, msg);
  else if (msg.cmd == 'cia')
    return require('/app/commands/projects/cia.js').exec(UnivBot, msg);
  else if (msg.cmd == 'site')
    return require('/app/commands/projects/site.js').exec(UnivBot, msg);
  else if (msg.cmd == 'help')
    return require('/app/commands/general/help.js').exec(UnivBot, msg);
};