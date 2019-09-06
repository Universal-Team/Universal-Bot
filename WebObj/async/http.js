// ========================================================
// Function
// ========================================================
function HTTP(callback) {

    // Setup vars
    if (typeof callback !== 'function')
        throw new ReferenceError('Invalid callback');
    var Link = this.Parent.Protocol+'://'+this.Parent.URL;
    var Module = this.Parent.Protocol;

    // Request website
    const web = require(Module);
    web.get(Link, response => {
        let array = [];
        response.on('data', data => array.push(data));
        response.on('end', () => {
            var buffer = Buffer.concat(array);
            var data = buffer.toString();
            callback(undefined, response, data);
        });
    }).on('error', error => {
        callback(error);
    });

};

// ========================================================
// Export function
// ========================================================
module.exports = HTTP;