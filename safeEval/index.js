function RNG(max, string) {
    var random = (max) =>
        '_0x' + Math.floor(Math.random() * (max + 1));
    let number = random(max);
    while (string.includes(number))
        number = random(max);
    return number;
};

function array(modules) {
    const util = require('util');
    var list = [];
    modules.forEach(string =>
        list.push(util.inspect(string))
    );
    return '[ ' + list.join(', ') + ' ]';
};

function isFile(file) {
    var fs = require('fs');
    var exts = ['', '.js', '.JS', '.json', '.JSON', '.node', '.NODE'];
    for (var ext of exts)
        if (fs.existsSync(file+ext))
            return true;
    return false;
};

function safeRequire(_module) {
    var modules = ['consolefs', 'fs', 'child_process', 'npm'];
    modules = modules.concat(/*process.argv*/);
    if (modules.includes(_module) ||
        isFile(_module))
        return {};
    return require(_module);
};

function safeEval(string, unmodules=[], maxUsage) {

    // Setup code
    var _IF = RNG(999999999, string);
    var _SR = RNG(999999999, string);
    string = string.replace(/require/g, _SR);
    string = isFile.toString()
        .replace('isFile', _IF)
        + string;
    string = safeRequire.toString()
        .replace('safeRequire', _SR)
        + string;
    string = 'console = { error: console.error, log: console.log, warn: console.warn };\nprocess = {};\ncode = undefined;\narray = undefined;' + string;
    string = string.replace('isFile', _IF);

    // Check non-modules
    if (!Array.isArray(unmodules) ||
        (unmodules.filter(item => typeof item !== 'string')
        .length))
        throw new Error('Invalid non-modules array');
    
    // Setup argv
    var ARGVs = [
        __dirname
        + require('path').sep
        + 'load.js',
        string,
        array(unmodules)
    ];

    // Load code
    var cmd = 'node'
    if (maxUsage)
      cmd += ' --max-old-space-size=' + maxUsage;
    var returned = require('child_process')
        .spawnSync(cmd, ARGVs, {
            windowsVerbatimArguments: false,
            encoding: 'utf8'
        });
    if (returned.error)
      return ('### NOT ENOUGH CPU ###');
    return returned.stdout
        .split('\u9999')
        .pop();
};

module.exports = safeEval;