module.exports = {
  name: 'nightly',
  usage: '<project>',
  desc: 'Sends the link to a nightly of a Universal Team app',
  DM: true,
  permissions: [],
  exec(UnivBot, msg) {
    switch(msg.args) {
      case 'Athena':
      case 'LeafEdit':
      case 'pkmn-chest':
      case 'Relaunch':
      case 'Universal-Manager':
        break;
      default:
        msg.send('Invalid project name! Please rerun the command followed by one of the following project names: \nAthena \nLeafEdit \npkmn-chest \nRelaunch \nUniversal-Manager');
        var back = true;
    };
    if (back)
      return;
    msg.send({
      embed: {
        color: 0x00c882,
        description: 'You can get the latest nightly of '+msg.args+' [here](https://github.com/Universal-Team/extras/tree/master/builds/'+msg.args+')'
       }
    })
  }
}

