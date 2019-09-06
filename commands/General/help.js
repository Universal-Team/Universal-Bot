const Discord = require('discord.js');
const ConsoleFS = require('consolefs');
function isCategory(UnivBot, name) {
  name = name.toLowerCase().trim();
  let ctg;
  for (var category of UnivBot.categories) {
    if (category.toLowerCase() == name) {
      ctg = category;
      break;
    }
  };
  return ctg;
};

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
    };
    
    // Create embed
    let color = 8557055;
    let image = UnivBot.client.user.avatarURL;
    if (msg.guild)
      image = msg.guild.image;
    if (msg.guild)
      color = msg.guild.bot.displayHexColor;
    let embed = new Discord.RichEmbed()
      .setColor(color)
      .setDescription('Here you can see a list of categories or commands. In order to get the commands of a category please use ``'+msg.prefix+'help <Category Name>`` or just use ``'+msg.prefix+'help`` for get a list of categories')
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
    
    msg.send({
      embed: embed
    });
  }
}
