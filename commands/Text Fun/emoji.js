module.exports = {
  name: 'emoji',
  usage: '<id>',
  desc: 'Sends any Discord emoji with it\'s ID',
  DM: true,
  permissions: [],
  exec(UnivBot, msg) {
    return msg.send('<\:emoji:'+msg.args+'>');
  }
};