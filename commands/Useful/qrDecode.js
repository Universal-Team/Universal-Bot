const { spawnSync }     = require('child_process');
const MessageAttachment = require('../../utils/MessageAttachment');
const fs                = require('fs');
const fetch             = require('node-fetch');

module.exports = {
	name: [ 'qrDecode', 'barcodeDecode', 'deQR', 'zbarimg' ],
	usage: '<link>',
	desc: 'Decodes the linked or attached QR/barcode',
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		let link = msg.args.value;
		if(msg.attachments.first())
			link = msg.attachments.first().attachment;

		if(!link)
			return msg.send('Enter a link!');

		if(link[0] == '<' && link[link.length - 1] == '>')
			link = link.substr(1, link.length - 2);

		fetch(link, {'method': 'Get'}).then(r => {
			if(r.status >= 200 && r.status <= 299) {
				return r.buffer();
			} else {
				throw Error(response.statusText);
			}
		}).then(r => {
			fs.writeFileSync('qr.png', r)
			let out = spawnSync('zbarimg', ['qr.png'], { encoding: 'utf-8' });
			if(fs.existsSync('qr.png')) {
				fs.unlinkSync('qr.png');
			}
			return msg.send(out.stdout);
		}).catch(e => {
			return msg.send('Invalid URL!');
		});

	}
}
