const ConsoleFS = require('consolefs');
function updateDB(UnivBot) {
  ConsoleFS.write.JSON(UnivBot.db, '/app/database.json');
};

module.exports = {
  name: ['setprefix', 'prefix', 'prefix-cfg'],
  usage: '<Prefix>',
  desc: 'Changes the prefix for commands on the server',
  permissions: [ 'ADMINISTRATOR' ],
  exec(UnivBot, msg) {
    if (!msg.args.length)
      return msg.send('Can\'t use an empty prefix!');
    var db = UnivBot.db[msg.guild.id];
    db.prefix = msg.args;
    updateDB(UnivBot);
    return msg.send('Sucessfully changed the prefix for the server!');
  }
};