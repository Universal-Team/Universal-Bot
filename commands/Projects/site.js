module.exports = {
  name: 'site',
  usage: '<project>',
  desc: 'Sends the link to a website of a Universal Team app',
  DM: true,
  permissions: [],
  exec(UnivBot, msg) {
    switch(msg.args.toLowerCase()) {
      case 'pkmn-chest':
      case 'relaunch':
      case 'universal-manager':
        break;
      default:
        msg.send('Invalid project name! Please rerun the command followed by one of the following project names: \npkmn-chest \nRelaunch \nUniversal-Manager');
        var back = true;
    };
    if (back)
      return;
    msg.send({
      embed: {
        color: 0x00c882,
        description: msg.args+'\'s page is [here](https://universal-team.github.io/'+msg.args.toLowerCase()+')'
       }
    })
  }
}

