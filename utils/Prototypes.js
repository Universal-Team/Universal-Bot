String.prototype.madeOf = function(charset) {
	return this.split('').filter(letter => charset.includes(letter)).length == this.length;
}
