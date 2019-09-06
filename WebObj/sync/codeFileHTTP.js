var Link = process.argv.pop();
var Module = process.argv.pop();
const web = require(Module);
web.get(Link, response => {
    let array = [];
    response.on('data', data => array.push(data));
    response.on('end', () => {
        var buffer = Buffer.concat(array);
        console.log(buffer.toString());
        process.exit();
    });
}).on('error', () => {
    process.exit(1);
});