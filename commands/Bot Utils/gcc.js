const ConsoleFS = require('consolefs');
var files = ['/app/gcc_temp.cpp', '/app/gcc_temp'];
var exec = require('child_process').execSync;

function MessageAttachment(buffer, filename) {
	if (!arguments.length) {
	 this.files = [];
	 return this;
	};
	if (!Buffer.isBuffer(buffer))
	 buffer = Buffer.from(buffer);
 this.files = [{}];
 this.files[0].attachment = buffer;
 this.files[0].name = filename;
 return this;
};

MessageAttachment.prototype.push = function(buffer, filename) {
	var attach = new MessageAttachment(buffer, filename).files[0];
 var key = this.files.length;
 this.files[key] = attach;
 return this;
};

function compile(code) {
 ConsoleFS.write.INT(code, files[0]);
 let program = {};
 try {
  exec(`gcc ${files[0]} -o ${files[1]}`);
  program.stdout = exec(files[1]).toString();
  if (program.stdout == '')
   program.stdout = 'undefined';
  program.binary = ConsoleFS.read.HEX(files[1]);
 } catch(e) {
  var stderr = (e + '').split('\n');
  var whereE = stderr[1].split(':');
  var type = stderr[1].split(':');
  type.shift(); type.shift(); type.shift();
  whereE = 'Error on line '
   + whereE[1]
   + ', on character '
   + whereE[2];
  program.stderr = '```'
   + whereE
   + '\n' + type.join(':').trim()
   + '\n' + stderr[2]
   + '\n' + stderr[3]
   + '```';
 };
 ConsoleFS.del(files[0]);
 if (ConsoleFS.exist(files[1]))
  ConsoleFS.del(files[1]);
 return program;
};

function evalC(code, msg) {
 var output = compile(code);
 let string = '**Here\'s the output of your script**';
 let attach = new MessageAttachment();
 if (output.stderr) {
  string += '\n' + output.stderr;
 } else {
  attach.push(
  	 output.binary, 'CompiledScript'
  	);
  if (output.stdout.length > 1024) {
  	 attach.push(
  	 	 Buffer.from(output.stdout),
  	 	 'stdout.txt'
  	 	);
   output.stdout = '(The output has been trimmed to it\'s first 1024 characters)\n'
    + '```\n'
    + output.stdout.substr(0, 1024)
    + '```';
  } else {
  	 output.stdout = '```\n'
  	  + output.stdout
  	  + '```';
  	};
  string += '\n' + output.stdout;
 };
 if (attach.files.length)
  return msg.send(string, attach);
 return msg.send(string);
};

module.exports = {
 name: ['gcc', 'evalC'],
 desc: 'Runs and compiles C code',
 usage: '<C code>',
 DM: true,
 permissions: [ 'DEV' ],
 exec(UnivBot, msg) {
 	 if (!msg.args.length)
 	  return msg.send('**Oops!** You didn\'t provided enough arguments');
 	 return evalC(msg.args, msg);
 	}
};
