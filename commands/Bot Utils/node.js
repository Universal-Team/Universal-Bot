function MessageAttachment(buffer, filename) {
    this.files = [{}];
    this.files[0].attachment = buffer;
    this.files[0].name = filename;
};

function safeEval(code, array=[], maxUsage) {
 var _safeEval = require('/app/safeEval/index.js');
 var out = _safeEval(code, array, maxUsage);
 if (out == '### NOT ENOUGH CPU ###')
   return new global.Arguments('**Your script uses too much CPU!!**', undefined);
 var args =  new global.Arguments('```js\n' + out + '```', undefined);
 if (args[0].length > 1024) {
  args[0] = '(The output has been trimmed to the first 1024 characters)\n' + args[0].substr(0, 1024) + '```';
  args[1] = new MessageAttachment(Buffer.from(out), 'Output.txt');
 };
 args[0] = '**Here is the output of your code**\n' + args[0];
 return args;
};

module.exports = {
  name: 'node',
  usage: '<JS Code>',
  desc: 'Executes JavaScript in safe mode',
  DM: true,
  permissions: [ 'DEV' ],
  
  async exec(UnivBot, msg) {
    if (!msg.args.length)
      return msg.send('**Oops!** You didn\'t provided enough arguments');
    var args = safeEval(msg.args, ['discord.js', 'request', 'express', 'ts2c', 'v8', 'os']);
    if (args[1])
      return msg.send(args[0], args[1]);
    return msg.send(args[0]);
  }
};