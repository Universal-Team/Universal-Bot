function MessageAttachment(buffer, filename) {
	if (!arguments.length) {
		this.files = [];
		return this;
	};
	if (!Buffer.isBuffer(buffer))
		buffer = Buffer.from(buffer);
	this.files = [{}];
	this.files[0].attachment = buffer;
	this.files[0].name = filename;
	return this;
};

MessageAttachment.prototype.push = function(buffer, filename) {
	var attach = new MessageAttachment(buffer, filename).files[0];
	var key = this.files.length;
	this.files[key] = attach;
	return this;
};

module.exports = MessageAttachment;