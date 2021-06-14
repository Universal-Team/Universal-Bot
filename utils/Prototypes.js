String.prototype.madeOf = function(charset) {
	return this.split("").filter(letter => charset.includes(letter)).length == this.length;
}

String.prototype.fancyFont = function(index) {
	return this.replace(/[A-Z]/g, r => String.fromCodePoint(r.codePointAt(0) + 0x1D3BF + (52 * index)))
			   .replace(/[a-z]/g, r => String.fromCodePoint(r.codePointAt(0) + 0x1D3B9 + (52 * index)));
}

String.prototype.caseReplaceAll = function(strReplace, strWith) {
	// See http://stackoverflow.com/a/3561711/556609
	var esc = strReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	var reg = new RegExp(esc, 'ig');
	return this.replace(reg, strWith);
}

String.prototype.regexEscape = function() {
	return this.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
