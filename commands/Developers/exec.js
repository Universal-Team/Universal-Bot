const Discord = require('discord.js');
var stringify = require('util').inspect;

module.exports = {
  name: 'exec',
  usage: 'exec <JS Code>',
  permissions: [ 'dev' ],
  async exec(UnivBot, msg) {
    let output;
    try {
      output = require('child_process').execSync(msg.args).toString();
      if (typeof output !== 'function')
        output = stringify(output);
      if (typeof output !== 'string')
        output = output.toString();
    } catch(e) {
      output = e;
    }
    if (output.length >= 1024) {
      msg.send('The output has been trimmed to the first 1024 characters. The full message was sent to the console');
      console.log(output);
      msg.send(output.substr(0, 1024), {code: 'js'});
    } else {
      msg.send(output, {code: 'js'});
    };
  }
};

