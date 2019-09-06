// ========================================================
// Function
// ========================================================
function Request(callback) {

    // Setup vars
    if (typeof callback !== 'function')
        throw new ReferenceError('Invalid callback');
    var Link = this.Parent.Protocol+'://'+this.Parent.URL;

    // Request website
    const web = require('request');
    web(Link, (error, response, body) => {
        callback(error, response, body);
    });

};

// ========================================================
// Export function
// ========================================================
module.exports = Request;