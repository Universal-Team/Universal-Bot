var Link = process.argv.pop();
const web = require('request');
web(Link, (error, response, body) => {
    if (error)
        throw error;
    console.log(body);
    process.exit();
});