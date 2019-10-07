const Discord = require('discord.js');
const ConsoleFS = require('consolefs');
function isCategory(UnivBot, name) {
  name = name.toLowerCase().trim();
  let ctg;
  if(name.length > 0) { 
    for (var category of UnivBot.categories) {
      if (category.toLowerCase().substr(0, name.length) == name) {
        ctg = category;
        break;
      }
    }
  }
  return ctg;
}
function isCommand(UnivBot, name) {
  name = name.toLowerCase().trim();
  let command;
  if(name.length > 0) { 
    for(let cmd of UnivBot.cmds) {
      cmd = require(cmd);
      for(let cmdName of cmd.name) {
        if(cmdName.toLowerCase().substr(0, name.length) == name) {
          command = cmd;
          break;
        }
      }
    }
  }
  return command;
}

module.exports = {
  name: [ 'help', 'cmds', 'commands' ],
  usage: '<Category>',
  desc: 'Gives info about a specific category or a list of all categories',
  DM: true,
  permissions: [],
  exec(UnivBot, msg) {
    
    // Detect if a category was given
    let title = 'List of categories';
    let type = 'dir';
    if (isCategory(UnivBot, msg.args)) {
      title = 'List of commands';
      type = 'file';
    } else if (isCommand(UnivBot, msg.args)) {
      title = 'Command info';
      type = 'cmd';
    }
    
    // Create embed
    let color = 8557055;
    let image = UnivBot.client.user.avatarURL;
    if (msg.guild)
      image = msg.guild.image;
    if (msg.guild)
      color = msg.guild.bot.displayHexColor;
    let embed = new Discord.RichEmbed()
      .setColor(color)
      .setDescription('Here you can get info on commands. To see the categories, use ``'+msg.prefix+'help``, to see commands in a category, do ``'+msg.prefix+'help <Category Name>``, or to see info on a command, do ``'+msg.prefix+'help <Command Name>``.')
      .setThumbnail(image)
      .setTitle(title);
    
    // Add commands/categories to embed
    if (type == 'dir') {
      embed.setFooter('• Amount of categories : '+UnivBot.categories.length, UnivBot.client.user.avatarURL);
      for (var category of UnivBot.categories) {
        var desc = 'No description yet'
        var path = '/app/commands/'+category+'/desc.txt';
        if (ConsoleFS.exist(path))
          desc = ConsoleFS.read.INT(path);
        category += '   ['+ConsoleFS.list('/app/commands/'+category).filter(cmd => cmd.endsWith('.js')).length+']';
        embed.addField(category, desc, true);
      };
    };
    if (type == 'file') {
      var category = isCategory(UnivBot, msg.args);
      var commands = ConsoleFS.list('/app/commands/'+category).filter(cmd => cmd.endsWith('.js'));
      embed.setFooter('• Amount of commands in '+category+' : '+commands.length, UnivBot.client.user.avatarURL);
      for (var command of commands) {
        var desc = require('/app/commands/'+category+'/'+command).desc;
        var name = require('/app/commands/'+category+'/'+command).name;
        if ((name instanceof Array)) {
          var nameStr = name[0];
          nameStr += ' '+require('/app/commands/'+category+'/'+command).usage;
          nameStr = msg.prefix+nameStr;
          desc += ' (Other names : **'+name.slice(1).join('**, **')+'**)'
          embed.addField(nameStr, desc, true);
        } else {
          name += ' '+require('/app/commands/'+category+'/'+command).usage;
          name = msg.prefix+name;
          embed.addField(name, desc, true);
        };
      };
    };
    if (type == 'cmd') {
      var desc = isCommand(UnivBot, msg.args).desc;
      var name = isCommand(UnivBot, msg.args).name;
      if ((name instanceof Array)) {
        var nameStr = name[0];
        // nameStr += ' '+require('/app/commands/'+category+'/'+command).usage;
        nameStr = msg.prefix+nameStr;
        desc += '\n(Other names : **'+name.slice(1).join('**, **')+'**)'
        embed.addField(nameStr, desc, true);
      } else {
        // name += ' '+require('/app/commands/'+category+'/'+command).usage;
        name = msg.prefix+name;
        embed.addField(name, desc, true);
      };
    };
    
    msg.send({
      embed: embed
    });
  }
}
