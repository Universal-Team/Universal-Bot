// ========================================================
// Setup variables
// ========================================================
var terminal = require('child_process').execSync;
var sep = require('path').sep;
var codeFile = `${__dirname}${sep}codeFileHTTP.js`;

// ========================================================
// Function
// ========================================================
function HTTP() {

    // Setup vars
    var Link = this.Parent.Protocol+'://'+this.Parent.URL;
    var Module = this.Parent.Protocol;

    // Get website
    let website;
    try {
        website = terminal(`node "${codeFile}" "${Module}" "${Link}"`);
    } catch(err) {};

    // Check website and return it
    if (!website)
        throw new Error('The URL doens\'t exists');
    return website.toString();

};

// ========================================================
// Export function
// ========================================================
module.exports = HTTP;