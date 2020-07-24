const { spawnSync } = require('child_process');
const compiled      = 'typescript.js';
const source        = 'typescript.ts';
const tsc           = 'node_modules/typescript/bin/tsc';
const fs            = require('fs');

function ts2js(string) {
	fs.writeFileSync(source, new Buffer.from(string));

	let stdio = spawnSync(tsc, [ source ], { encoding: 'utf-8' });

	let code;
	if(fs.existsSync(compiled)) {
		code = fs.readFileSync(compiled).toString('utf-8');
		fs.unlinkSync(compiled);
	}
	fs.unlinkSync(source);

	if(stdio.status)
		return { stderr: stdio.stderr, stdout: stdio.stdout };

	return { compiled: code };
}

module.exports = ts2js;
