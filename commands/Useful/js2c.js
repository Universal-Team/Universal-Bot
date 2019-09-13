const ts2c = require("ts2c");
module.exports = {
  name: ['js2c', 'ts2c'],
  usage: '',
  desc: 'Uses andrei\'s ts2c module for transpile TS/JS to C',
  DM: true,
  permissions: [],
  exec(UnivBot, msg) {
    
    if (!msg.args.length)
      return msg.send('**Oops!** Can\'t transpile the void :P');
    let cCode = '**Your code has an error**\n```js\nError: Code contains stuff not supported by ts2c yet```';
    try {
      cCode = '**Here is your code transpiled to C**\n```c\n'+ts2c.transpile(msg.args)+'```';
    } catch(e) {
      cCode = '**Your code has an error**\n```js\n'+e+'```';
    };
    if (cCode.length > 1024)
      return msg.send('**Here is your code transpiled to C**\n(The output has been trimmed to the first 1024 characters)\n'+cCode.substr(0, 1024)+'```');
    return msg.send(cCode);
    
  }
};