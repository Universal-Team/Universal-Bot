var stringify = require('util').inspect;

module.exports = {
  name: 'eval',
  usage: '<JS Code>',
  desc: 'Executes JS code as the bot',
  DM: true,
  permissions: [ 'DEV' ],
  
  async exec(UnivBot, msg) {
    
    let hide = false;
    let del = false;
    if (msg.args.toLowerCase().startsWith('--hide')) {
      hide = true;
      msg.args = msg.args.substr('--hide'.length).trim();
    };
    if (msg.args.toLowerCase().startsWith('--del')) {
      del = true;
      msg.args = msg.args.substr('--del'.length).trim();
    };
    if (msg.args.toLowerCase().startsWith('--hide')) {
      hide = true;
      msg.args = msg.args.substr('--hide'.length).trim();
    };
    
    if (!msg.args.length)
      return msg.send('**Oops!** You didn\'t provided enough arguments');
    
    let output;
    try {
      output = await eval(msg.args);
      if (typeof output !== 'function')
        output = stringify(output);
      if (typeof output !== 'string')
        output = output.toString();
    } catch(e) {
      output = e;
    }
    
    if (del) {
      msg.delete();
    };
    if (hide) {
      console.log(output);
      return;
    };
    
    if (output.length >= 1024) {
      msg.send('The output has been trimmed to the first 1024 characters. The full message was sent to the console');
      console.log(output);
      msg.send(output.substr(0, 1024), {code: 'js'});
    } else {
      msg.send(output, {code: 'js'});
    };
    
  }
};