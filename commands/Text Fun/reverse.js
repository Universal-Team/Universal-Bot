module.exports = {
  name: [ 'reverse', 'backwards' ],
  usage: '<Message>',
  desc: 'Reverses the message',
  DM: true,
  permissions: [],
  exec(UnivBot, msg) {
    if (msg.args.length)
      return msg.send('**'+msg.author.tag+'** : '+msg.args.split('').reverse().join(''));
    return msg.send('I can\'t reverse the void');
  }
};