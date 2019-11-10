const { spawnSync } = require('child_process');
const compiledFile  = '/app/utils/compile.bin';
const fs            = require('fs');

function compile(code, type) {
  let sourceFile    = '/app/utils/compile';
  
  let extension = 'cpp';
  switch(type.toLowerCase()) {
    case 'asm':
    case 'assembly':
      extension = 's';
      code += '\n';
      break;
      
    case 'c':
    case 'normal':
      extension = 'c';
      break;
  };
  
  sourceFile += '.' + extension;
  fs.writeFileSync(sourceFile, new Buffer.from(code));
  let stdio = spawnSync('g++', ['-std=c++11', sourceFile, '-o', compiledFile], { encoding: 'utf-8' });
  
  let exec = spawnSync(compiledFile, { encoding: 'utf-8' });
  fs.unlinkSync(sourceFile);
  
  let binary;
  if (fs.existsSync(compiledFile)) {
    binary = fs.readFileSync(compiledFile);
    fs.unlinkSync(compiledFile);
  };
  
  if (!stdio.stderr.length)
    if (!exec.stderr.length)
      return { binary: binary, path: compiledFile, stdout: exec.stdout }
    else
      return exec.stderr;
  
  return stdio.stderr;
};

module.exports = compile;