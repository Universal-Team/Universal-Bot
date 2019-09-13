module.exports = {
  name: 'cia',
  usage: '<project>',
  desc: 'Sends a QR of a Universal Team app',
  DM: true,
  permissions: [],
  exec(UnivBot, msg) {
    
    let projects = [
      ['LeafEdit', 0x04B324, '<:leafEdit:615581725346627603>'],
      ['pkmn-chest', 0xBF0300, '<:pkmnchest:613597377625980939>'],
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
    
    var name = project[2]+' '+project[0];
    var desc = 'Use the link above or\nthis **QR** for install the cia';
    
    msg.send({
      embed: {
        color: project[1],
        title: name,
        description: desc,
        image: { url: 'https://raw.githubusercontent.com/Universal-Team/extras/master/builds/'+project[0]+'/'+project[0]+'.png' },
        url: 'https://raw.githubusercontent.com/Universal-Team/extras/master/builds/'+project[0]+'/'+project[0]+'.cia'
      }
    });
  }
};
