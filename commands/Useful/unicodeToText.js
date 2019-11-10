module.exports = {
  name: ['unicodeToText', 'utt', 'text'],
  usage: '<character codes>',
  desc: 'Converts a unicode character codes to their characters',
  DM: true,
  permissions: [],
  exec(UnivBot, msg) {
    if (msg.args.length) {
      let message = '';
      for(let char of msg.args.split(' ')) {
        message += String.fromCharCode(parseInt(char));
      } 
      return msg.send(message);
    }
    return msg.send('I can\'t convert nothing...');
  }
};