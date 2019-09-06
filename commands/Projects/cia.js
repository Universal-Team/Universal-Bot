module.exports = {
  name: 'cia',
  usage: '<project>',
  desc: 'Sends a QR of a Universal Team app',
  DM: true,
  permissions: [],
  exec(UnivBot, msg) {
    switch(msg.args) {
      case 'LeafEdit':
      case 'pkmn-chest':
      case 'Universal-Manager':
        break;
      default:
        msg.send('Invalid project name! It must be : \nUniversal-Manager \npkmn-chest \nLeafEdit');
        var back = true;
    };
    if (back)
      return;
    msg.send({
      files: [
        'https://raw.githubusercontent.com/Universal-Team/extras/master/builds/'+msg.args+'/'+msg.args+'.png'
      ]
    })
  }
}
