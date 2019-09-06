// ========================================================
// Function
// ========================================================
function hasRequest() {

    // Setup default result
    let result = false;

    // Check for request
    try {
        var Request = require('request').Request;
        if (typeof Request == 'function')
            result = true;
    } catch(err) {};

    // Return the result
    return result;
    
};

// ========================================================
// Export function
// ========================================================
module.exports = hasRequest;