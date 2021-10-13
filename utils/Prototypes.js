String.prototype.madeOf = function(charset) {
	return this.split("").filter(letter => charset.includes(letter)).length == this.length;
}

String.prototype.fancyFont = function(index) {
	return this.replace(/[A-Z]/g, r => String.fromCodePoint(r.codePointAt(0) + 0x1D3BF + (52 * index)))
			   .replace(/[a-z]/g, r => String.fromCodePoint(r.codePointAt(0) + 0x1D3B9 + (52 * index)));
}

String.prototype.caseReplaceAll = function(strReplace, strWith) {
	var reg = new RegExp(strReplace.regexEscape(), "ig");
	return this.replace(reg, strWith);
}

String.prototype.regexEscape = function() {
	// See http://stackoverflow.com/a/3561711/556609
	return this.replace(/[\-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
