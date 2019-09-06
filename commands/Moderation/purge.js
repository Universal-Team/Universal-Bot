module.exports = {
  name: 'purge',
  usage: '<Number of messages to delete>',
  desc: 'Deletes a certain amount of messages',
  permissions: [ 'MANAGE_MESSAGES' ],
  async exec(UnivBot, msg) {
    
    // Setup vars
    var err1 = 'Can\'t delete messages older than 2 weeks';
    var err2 = 'Can\'t delete more than 100 messages at a time';
    var err3 = 'The provided number isn\'t valid';
    
    // Check the number
    var number = parseInt(msg.args);
    if (number.toString().includes('-') || number.toString().includes('.') || number.toString() == '0' || !number.toString().length || number.toString() == 'NaN'  || number.toString().includes('e') || number.toString() == 'Infinity')
      return msg.send(err3);
    if (number > 100)
      return msg.send(err2);
    
    // Delete messages
    await msg.delete();
    try {
      await msg.channel.bulkDelete(number);
    } catch(e) {
      msg.send(err1)
    };
    
  }
};