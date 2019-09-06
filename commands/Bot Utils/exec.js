var terminal = require('child_process').execSync;

module.exports = {
  name: ['exec', 'terminal'],
  usage: '<Bash Code>',
  desc: 'Executes bash code in the glitch terminal',
  DM: true,
  permissions: [ 'DEV' ],
  
  exec(UnivBot, msg) {
    
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
      output = terminal(msg.args).toString();
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
      msg.send(output.substr(0, 1024), {code: 'bash'});
    } else {
      msg.send(output, {code: 'js'});
    };
    
  }
};

