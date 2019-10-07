module.exports = {
  name: 'wiki',
  usage: '<project>',
  desc: 'Sends the link to a wifi for a Universal Team app',
  DM: true,
  permissions: [],
  exec(UnivBot, msg) {

    let projects = [
      // ['BetterDex', 0x000080, '<:BetterDex:630493895859503139>'],
      // ['iDex', 0x000080, '<:iDex:597625862069682176>'],
      ['LeafEdit', 0x04B324, '<:leafEdit:630495340281462853>'],
      ['pkmn-chest', 0xBF0300, '<:pkmnchest:613597377625980939>'],
      // ['Relaunch', 0x606060, '<:relaunch:620365238243688467>'],
      ['Universal-Manager', 0x002F50, '<:universalManager:615582592942735360>']
    ];
    
    let project;
    if (msg.args.length > 0)
      project = projects.find(r => r[0].toLowerCase().startsWith(msg.args.toLowerCase()));
    
    let description = ['Please rerun the command followed by one of the following project names:\n'];
    if (!project) {
      for (var item of projects) {
        description.push(item[2] + ' **' + item[0] + '**');
      };
      description = description.join('\n');

      msg.send({
        embed: {
            color: 0x00c882,
            title: 'Invalid project name!',
            description: description
        }
      });
      
      return;
    };

    msg.send({
      embed: {
        color: project[1],
        description: project[2]+' You find the wiki for **'+project[0]+'** [here](https://github.com/Universal-Team/'+project[0]+'/wiki)'
       }
    })
  }
}

