// ========================================================
// Setup variables
// ========================================================
var Collection = {};
Collection.addValue = require('./functions/addValue');
Collection.hasRequest = require('./functions/hasRequest');
Collection.isValid = require('./functions/isValid');
var RegExps = {};
RegExps['%27'] = new RegExp('\'', 'g');
RegExps['%2F'] = new RegExp('%2F', 'g');
RegExps['%3A'] = new RegExp('%3A');

// ========================================================
// Function
// ========================================================
function Web(URL) {

    // Check the URL and "new" keyword
    if (!new.target)
        throw new Error('Constructor must be called using "new" keyword');
    Collection.isValid(URL);
    
    // Setup URL
    URL = URL.trim();
    URL = encodeURIComponent(URL);
    URL = URL.replace(RegExps['%27'], '%27');
    URL = URL.replace(RegExps['%3A'], ':');
    URL = URL.replace(RegExps['%2F'], '/');

    

    // Setup Object
    Collection.addValue(this, 'Protocol', URL.split(':')[0]);
    Collection.addValue(this, 'URL', URL.substr(this.Protocol.length+3));

    // Setup Object's functions
    let Sync = {};
    let Async = {};
    Object.defineProperty(Sync, 'Parent', { value: this });
    Object.defineProperty(Async, 'Parent', { value: this });

    if (Collection.hasRequest()) {

        Sync.get = require('./sync/request');
        Sync.getAlt = require('./sync/http');
        Sync.type = 'Request';

        Async.get = require('./async/request');
        Async.getAlt = require('./async/http');
        Async.type = 'Request';

    } else {

        Sync.get = require('./sync/http');
        Sync.type = 'HTTP';

        Async.get = require('./async/http');
        Async.type = 'HTTP';

    }

    // Add functions to Object
    Collection.addValue(this, 'Sync', Sync);
    Collection.addValue(this, 'Async', Async);

    // Return object
    return this;

};

// ========================================================
// Export Function
// ========================================================
module.exports = Web;