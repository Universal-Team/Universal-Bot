module.exports = {
  name: 'release',
  usage: '<project>',
  desc: 'Sends the link to a release of a Universal Team app',
  DM: true,
  permissions: [],
  exec(UnivBot, msg) {
    switch(msg.args) {
      case 'LeafEdit':
      case 'pkmn-chest':
      case 'Relaunch':
      case 'Universal-Manager':
        break;
      default:
        msg.send('Invalid project name! Please rerun the command followed by one of the following project names: \nLeafEdit \npkmn-chest \nRelaunch \nUniversal-Manager');
        var back = true;
    };
    if (back)
      return;
    msg.send({
      embed: {
        color: 0x00c882,
        description: 'You can get the latest release of '+msg.args+' [here](https://github.com/Universal-Team/'+msg.args+'/releases/latest)'
       }
    })
  }
}

