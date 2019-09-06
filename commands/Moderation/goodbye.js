const ConsoleFS = require('consolefs');
function updateDB(UnivBot) {
  ConsoleFS.write.JSON(UnivBot.db, '/app/database.json');
};
function makeJSON(obj) {
  obj = JSON.parse(JSON.stringify(obj));
  var object = {};
  object.Message = obj.string;
  object.ChannelID = obj.channel;
  if (object.ChannelID == 'sys')
    object.ChannelID = 'System Channel';
  object.MessagesEnabled = obj.enabled;
  return '\n__**Goodbye Message Config :**__```json\n'+JSON.stringify(object, null, 4)+'\n```';
}

module.exports = {
  name: ['goodbye', 'goodbye-message', 'goodbye-cfg'],
  usage: '',
  desc: 'Configures the goodbye messages',
  permissions: [ 'ADMINISTRATOR' ],
  exec(UnivBot, msg) {
    
    // Setup vars
    var db = UnivBot.db[msg.guild.id];
    var err1 = '**Error :** Can\'t use an empty message for the goodbye messages';
    var err2 = '**Error :** Cant find that channel'
    var err3 = `__**Invalid option! Follow one of those examples :**__

This disables the goodbye messages
\`${msg.prefix}goodbye --disable\`

This enables the goodbye messages
\`${msg.prefix}goodbye --enable\`

This selects a channel for the messages.
You can type "default" for use the system channel
\`${msg.prefix}goodbye --channel #channel-name\`

This is the goodbye message itself. You can
include those 'variables' in the text :
\`\`\`js
\`List of variables

\${user.id} ID of the user that left
\${user.ping} Ping to the user that left
\${user.tag} Tag of the user that left
\${user.name} Username of the user that left
\${guild.name} Name of the server
\${guild.id} ID of the server
\${guild.amount} Amount of users in the server\`\`\`
\`${msg.prefix}goodbye --message <Text for goodbye message>\``
    
    // Get option and args
    var option = msg.args.split(' ')[0].toLowerCase();
    var arg = msg.args.split(' ').slice(1).join(' ').trim();
    
    // Check for enable and disable
    if (option == '--enable') {
      db.messages.goodbye.enabled = true;
      updateDB(UnivBot);
      return msg.send('Enabled goodbye messages'+makeJSON(db.messages.goodbye));
    };
    if (option == '--disable') {
      db.messages.goodbye.enabled = false;
      updateDB(UnivBot);
      return msg.send('Disabled goodbye messages'+makeJSON(db.messages.goodbye));
    };
    
    // Check for channel
    if (option == '--channel') {
      if (arg.toLowerCase() == 'default') {
        db.messages.goodbye.channel = 'sys';
        updateDB(UnivBot);
        return msg.send('Sucessfully changed the goodbye channel to the system channel'+makeJSON(db.messages.goodbye));
      };
      var ID = arg.substr(0, arg.length-1).substr(2);
      var channel = msg.guild.channels.get(ID);
      if (!channel)
        return msg.send(err2);
      db.messages.goodbye.channel = ID;
      updateDB(UnivBot);
      return msg.send('Sucessfully changed the goodbye channel to **<#'+ID+'>**'+makeJSON(db.messages.goodbye));
    };
    
    // Check for message
    if (option == '--message') {
      if (!arg.length)
        return msg.send(err1);
      db.messages.goodbye.string = arg;
      updateDB(UnivBot);
      return msg.send('Sucessfully changed the goodbye message'+makeJSON(db.messages.goodbye));
    };
    
    // Send list of options
    return msg.send(err3);
    
  }
};