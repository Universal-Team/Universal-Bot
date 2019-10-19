// ===========================
// Prototype Functions
// ===========================
String.prototype.splitArgs = function(sep) {
	var array = this.split(sep);
	var args = Arguments.from(array);
	return args;
};
const __proto__ = {

	// ===========================
	// Mutator methods
	// ===========================
	copyWithin(target, start, end) {
		var array = this.toArray();
		array = array.copyWithin(target, start, end);
		for (var i = 0; i < array.length; i++) {
			this[i] = array[i];
		};
		this.length = array.length
		return this;
	},
	fill(value, start, end) {
		var array = this.toArray();
		array = array.fill(value, start, end);
		for (var i = 0; i < array.length; i++) {
			this[i] = array[i];
		};
		this.length = array.length
		return this;
	},
    pop() {
    	var key = this.length-1;
    	var item = this[key];
    	this.length = key
    	delete this[key];
    	return item;
	},
    push() {
    	let key = this.length;
    	for (var arg of arguments) {
    	    this[key] = arg;
    	    key++
    	};
    	this.length = key;
    	return this;
	},
	reverse() {
		var array = this.toArray();
		array.reverse();
		for (var i = 0; i < array.length; i++) {
			this[i] = array[i];
		};
		return this;
	},
    shift() {
    	var item = this[0];
    	for (var key = 0; (key+1) < this.length; key++) {
    	    this[key] = this[key+1];
    	};
    	delete this[this.length-1];
    	this.length = this.length-1;
    	return item;
	},
	sort(callback) {
		var array = this.toArray();
		array = array.sort(callback);
		return Arguments.from(array);
	},
	splice(start, end, item) {
		var array = this.toArray();
		var args = Arguments.from(array.splice(start, end, item));
		for (var i = 0; i < array.length; i++) {
			this[i] = array[i];
		};
		this.length = array.length;
		return args;
	},
	unshift() {
		var array = this.toArray();
		var args = Arguments.from(arguments).reverse();
		for (var item of args) {
			array.unshift(item);
		};
		for (var i = 0; i < array.length; i++) {
			this[i] = array[i];
		};
		this.length = array.length;
		return array.length;
	},

	// ===========================
	// Accessor methods
	// ===========================
    callWithArgs(callback, New) {
    	let args = '';
    	for (var i = 0; i < this.length; i++) {
    	    args += 'this['+i+'], ';
    	};
		var call = 'callback('+args.substr(0, args.length-2)+');';
		if (New)
			call = 'new '+call;
    	var output = eval(call);
    	return output;
	},
	concat() {
		var array = this.toArray();
		for (var item of arguments) {
			if (Arguments.isArgs(item))
				if (item.toArray) {
					item = item.toArray();
				} else {
					var arr = [];
					for (var arg of item) {
						arr.push(arg);
					}
					item = arr;
				};
			array = array.concat(item);
		};
		return Arguments.from(array);
	},
    includes(element) {
    	var array = this.toArray();
    	return array.includes(element);
	},
    indexOf(search, index) {
    	var array = this.toArray();
    	return array.indexOf(search, index);
	},
	join(sep) {
		var array = this.toArray();
		return array.join(sep);
	},
    lastIndexOf(search, index) {
    	var array = this.toArray();
    	return array.lastIndexOf(search, index);
	},
    slice(start, end) {
    	var array = this.toArray();
    	array = array.slice(start, end);
    	var args = Arguments.from(array);
    	return args;
	},
	toArray() {
	    let array = [];
	    for (var arg of this) {
	        array.push(arg);
	    };
	    return array;
	},
    toJSON() {
    	let object = {};
    	object.type = 'Arguments';
    	object.data = this.toArray();
    	var string = JSON.stringify(object, null, 4);
    	return string;
	},
	toSource() {
		var stringify = require('util').inspect;
		return stringify(this, {
			depth: Infinity
		});
	},
    toString() {
		var array = this.toArray();
    	return array.toString();
	},
	toLocaleString(locals, options) {
		var array = this.toArray();
    	return array.toLocaleString(locals, options);
	},

	// ===========================
	// Iteration methods
	// ===========================
	entries() {
		var array = this.toArray();
		return array.entries();
	},
    every(callback, thisArg) {
		let T;
		if (arguments.length > 1)
			T = thisArg;
    	for (var i = 0; i < this.length; i++) {
    	    var item = this[i];
			if (callback.call(T, item, i, this) !== true)
				return false;
		};
		return true;
	},
    filter(callback, thisArg) {
    	var args = new Arguments();
		let T;
		if (arguments.length > 1)
			T = thisArg;
    	for (var i = 0; i < this.length; i++) {
    	    var item = this[i];
			if (callback.call(T, item, i, this) == true)
				args.push(item);
		};
		return args;
	},
    find(callback, thisArg) {
		let T;
		if (arguments.length > 1)
			T = thisArg;
    	for (var i = 0; i < this.length; i++) {
    	    var item = this[i];
			if (callback.call(T, item, i, this) == true)
				return item;
		};
	},
    findIndex(callback, thisArg) {
		let T;
		if (arguments.length > 1)
			T = thisArg;
    	for (var i = 0; i < this.length; i++) {
    	    var item = this[i];
			if (callback.call(T, item, i, this) == true)
				return i;
		};
		return -1;
	},
	flat(depth) {
		var result = new Arguments();
		var loop = Math.floor(depth) || 1;
		if (loop == 1 && depth == 0)
			loop = 0;
		for (var item of this) {
			if (Arguments.isArgs(item) && loop > 0) {
				for (var arg of item.flat(loop-1)) {
					result.push(arg);
				};
			} else {
				result.push(item);
			};
		};
		return result;
	},
	flatMap(callback, thisArg) {
		var args = this.map(callback, thisArg);
		return args.flat(1);
	},
    forEach(callback, thisArg) {
		let T;
		if (arguments.length > 1)
			T = thisArg;
    	for (var i = 0; i < this.length; i++) {
    	    var item = this[i];
    	    callback.call(T, item, i, this);
    	};
	},
	keys() {
		var array = this.toArray();
		return array.keys();
	},
    map(callback, thisArg) {
		let args = new Arguments();
		let T;
		if (arguments.length > 1)
			T = thisArg;
    	for (var i = 0; i < this.length; i++) {
    	    var item = this[i];
			args.push(callback.call(T, item, i, this));
		};
		return args;
	},
    reduce(callback, startVal) {
		let acc = this[0], start = 1;
		if (arguments.length > 1) {
			start = 0;
			acc = startVal;
		};
    	for (var i = start; i < this.length; i++) {
    	    var item = this[i];
			acc = callback.call(null, acc, item, i, this);
		};
		return acc;
	},
    reduce(callback, startVal) {
		let acc = this[0], start = 1;
		if (arguments.length > 1) {
			start = 0;
			acc = startVal;
		};
    	for (var i = start; i < this.length; i++) {
    	    var item = this[i];
			acc = callback.call(null, acc, item, i, this);
		};
		return acc;
	},
    reduceRight(callback, startVal) {
		let acc = this[this.length-1], start = this.length-2;
		if (arguments.length > 1) {
			start = this.length-1;
			acc = startVal;
		};
    	for (var i = start; i > -1; i--) {
    	    var item = this[i];
			acc = callback.call(null, acc, item, i, this);
		};
		return acc;
	},
    some(callback, thisArg) {
		let T;
		if (arguments.length > 1)
			T = thisArg;
    	for (var i = 0; i < this.length; i++) {
    	    var item = this[i];
			if (callback.call(T, item, i, this) == true)
				return true;
		};
		return false;
	},
	values() {
		var array = this.toArray();
		return array.values();
	}
	
};

// ===========================
// Methods
// ===========================
function Arguments() {
    if (!new.target)
		throw new Error('Constructor must be called with "new" keyword');
	for (var key of Object.keys(__proto__))
        Object.defineProperty(arguments, key, {
            value: __proto__[key],
            writable: false,
            enumerable: false,
            configurable: false
		});
	if (arguments.length == 1 && typeof arguments[0] == 'number') {
		var array = Array(arguments[0]);
		var args = Arguments.from(array);
		return args;
	};
    return arguments;
};
Arguments.of = function() {
	if (new.target)
		throw new Error('Function must NOT be called with "new" keyword');
	var args = Arguments.from(arguments).push(null);
	args = args.callWithArgs(Arguments, true);
	args.pop();
	return args;
};
Arguments.from = function() {
    if (new.target)
		throw new Error('Function must NOT be called with "new" keyword');
	if (arguments.length == 1 && Array.isArray(arguments[0])) {
		var args = '';
		for (var i = 0; i < arguments[0].length; i++) {
			args += ', arguments[0]['+i+']';
		};
		args = args.substr(2);
		return eval('new Arguments('+args+')');
	};
	if (Arguments.isArgs(arguments[0])) {
		var args = new Arguments();
		for (var argument of arguments[0]) {
			args.push(argument);
		};
		return args;
	};
	var args = Arguments.from(arguments);
	var array = args.callWithArgs(Array.from);
	args = Arguments.from(array);
	return args;
};
Arguments.fromJSON = function(string) {
    if (new.target)
		throw new Error('Function must NOT be called with "new" keyword');
	var object = JSON.parse(string);
	if (object.type !== 'Arguments' || !Array.isArray(object.data))
		throw new Error('Invalid JSON arguments string');
	return Arguments.from(object.data);
}

// ===========================
// Const functions
// ===========================
Arguments.isArgs = function(args) {
	if (typeof args !== 'object' ||
		args instanceof Date ||
    	args instanceof Array ||
		args instanceof Int8Array ||
		args instanceof Uint8Array ||
		args instanceof Uint8ClampedArray ||
		args instanceof Int16Array ||
		args instanceof Uint16Array ||
		args instanceof Int32Array ||
		args instanceof Uint32Array ||
		args instanceof Float32Array ||
		args instanceof Float64Array ||
    	args instanceof Map ||
    	args instanceof Set)
    	return false;
    try {
    	for (var arg of args) {};
    	return true;
    } catch(e) {};
    return false;
};

// ===========================
// Export constructor
// ===========================
global.Arguments = Arguments;
module.exports = Arguments;