// ========================================================
// Setup variables
// ========================================================
var terminal = require('child_process').execSync;
var sep = require('path').sep;
var codeFile = `${__dirname}${sep}codeFileREQUEST.js`;

// ========================================================
// Function
// ========================================================
function Request() {

    // Setup vars
    var Link = this.Parent.Protocol+'://'+this.Parent.URL;

    // Get website
    let website;
    try {
        website = terminal(`node "${codeFile}" "${Link}"`);
    } catch(err) {};

    // Check website and return it
    if (!website)
        throw new Error('The URL doens\'t exists');
    return website.toString();

};

// ========================================================
// Export function
// ========================================================
module.exports = Request;