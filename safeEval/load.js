/*
 * process.argv[0] = node
 * process.argv[1] = load.js
 * process.argv[2] = code
 * process.argv[3] = unmodules
 */

// Setup values
process.argv.shift();
process.argv.shift();
var code = process.argv.shift();
var array = process.argv.shift();

// Run code
code = code.replace('/*process.argv*/', array);
try {
    global.out = eval(code);
    if (typeof global.out == 'function') {
        console.log(
            '\u9999' + global.out.toString()
        );
    } else {
        console.log(
            '\u9999' + require('util')
                .inspect(
                    global.out
                )
        )
    }
} catch(error) {
    console.log(
        '\u9999' + error
    );
};