function (code, msg) {
	function MessageAttachment(buffer, filename) {
  this.files = [{}];
  this.files[0].attachment = buffer;
  this.files[0].name = filename;
 };
 function compile(code) {
  var files = ['/app/gcc_temp.cpp', '/app/gcc_temp'];
  var ConsoleFS = require('consolefs');
  var exec = require('child_process').execSync;
  ConsoleFS.write.INT(code, files[0]);
  let program = {};
  try {
   exec();
   program.stdout = exec(files[1]).toString();
   if (program.stdout == '')
    program.stdout = 'undefined';
  } catch(e) {
   var stderr = (e + '').split('
');
   var whereE = stderr[1].split(':');
   var type = stderr[1].split(':');
   type.shift(); type.shift(); type.shift();
   whereE = 'Error on line '
    + whereE[1]
    + ', on character '
    + whereE[2];
   program.stderr = '';
  };
  ConsoleFS.del(files[0]);
  if (ConsoleFS.exist(files[1]))
   ConsoleFS.del(files[1]);
  return program;
 };
 var output = compile(code);
 let string = '**Here\'s the output of your script**';
 let attach;
 if (output.stderr) {
  string += '
' + output.stderr;
 } else {
  if (output.stdout.length > 1024) {
  	 attach = new MessageAttachment(
  	 	 Buffer.from(output.stdout),
  	 	 'stdout.txt'
  	 	);
   output.stdout = '(The output has been trimmed to it\'s first 1024 characters)
'
    + '';
  } else {
  	 output.stdout = '';
  	};
  string += '
' + output.stdout;
 };
 if (attach)
  return msg.send(string, attach);
 return msg.send(string);
}
