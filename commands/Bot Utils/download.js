const fetch = require('node-fetch');
const fs    = require('fs');

module.exports = {
  name: ['download', 'request'],
  usage: '<URL> <Output File>',
  desc: 'Downloads a file from a url onto the bot\'s repo',
  DM: true,
  permissions: [ 'DEV' ],
  
  async exec(UnivBot, msg) {
    return msg.send('Ooops, im still being made, don\'t use me yet please.');
    
    let URL  = msg.split(' ')[0];
    let file = msg.split(' ')[1];
    
    if (!URL || !file)
      return msg.send('**Oops!** You didn\'t provided enough arguments');
    
    try {
      fs.mkdirSync(file.split('/').slice(0, -1), { recursive: true });
    } catch(e) {
      return msg.send('Invalid path! Can\'t create folder inside a file');
    };
    
    if (fs.existsSync(file))
      return msg.send('Can\'t save website as '+file+' since it already exists');

    try {
      fetch(URL)
        .then(res => {
          const dest = fs.createWriteStream('./octocat.png');
          res.body.pipe(dest);
        });
    } catch(e) {
      return msg.send('The URL doens\'t exists!');
    };
    
  }
};
