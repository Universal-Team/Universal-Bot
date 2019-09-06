// ========================================================
// Setup variables
// ========================================================
var Errors = {
    InvStr: new ReferenceError('Invalid string. Can\'t be used as URL'),
    InvUrl: new ReferenceError('Invalid URL. Can\'t be used for request')
};

// ========================================================
// Function
// ========================================================
function isValid(URL) {

    // Check if is a string or starts with HTTP/HTTPS
    if (typeof URL !== 'string')
        throw Errors.InvStr;
    if (!URL.startsWith('http://') && !URL.startsWith('https://'))
        throw Errors.InvUrl;

    // Check if after HTTP/HTTPS there is a website
    switch(URL.startsWith('http://')) {
        case true:
            if (!URL.substr(7).length)
                throw Errors.InvUrl;
            break;
        default:
            if (!URL.substr(8).length)
                throw Errors.InvUrl;
    };

};

// ========================================================
// Export function
// ========================================================
module.exports = isValid;