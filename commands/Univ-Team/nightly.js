let projects = [
  ['BetterDex', 0x000080, '<:BetterDex:630493895859503139>'],
  ['iDex', 0x000080, '<:iDex:597625862069682176>'],
  ['LeafEdit', 0x04B324, '<:leafEdit:630495340281462853>'],
  ['pkmn-chest', 0xBF0300, '<:pkmnchest:613597377625980939>'],
  ['Relaunch', 0x606060, '<:relaunch:620365238243688467>'],
  ['Universal-Manager', 0x002F50, '<:universalManager:615582592942735360>']
];

function findProject(name) {
  if(name.length > 0) {
    let possibleProjects = [];
    for(let i in projects) {
      possibleProjects.push(projects[i][0].toLowerCase().search(name.toLowerCase()));
    }
    
    for(let i in possibleProjects) {
    if(possibleProjects[i] == -1) possibleProjects[i] = Infinity;
    }

    return projects[possibleProjects.indexOf(Math.min.apply(Math, possibleProjects))];
  }
}

module.exports = {
  name: 'nightly',
  usage: '<project>',
  desc: 'Sends the link to a nightly of a Universal Team app',
  DM: true,
  permissions: [],
  exec(UnivBot, msg) {  
    let project = findProject(msg.args);
    
    
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
        description: project[2]+' You can get the latest nightly of **'+project[0]+'** [here](https://github.com/Universal-Team/extras/tree/master/builds/'+project[0]+')'
       }
    });
  }
};