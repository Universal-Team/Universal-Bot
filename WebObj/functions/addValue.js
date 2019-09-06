// ========================================================
// Function
// ========================================================
function addValue(object, key, value) {

    // Make pattern
    let pattern = {};
    pattern.value = value;
    pattern.enumerable = true;
    pattern.configurable = false;
    pattern.writable = false;

    // Define pattern onto object
    Object.defineProperty(
        object,
        key,
        pattern
    );

    // Return object
    return object;

};

// ========================================================
// Export function
// ========================================================
module.exports = addValue;