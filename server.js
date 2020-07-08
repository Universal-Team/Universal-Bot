// ================================================================
// Keep the project alive
// ================================================================
/* const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
	console.log('Ping N: -'+Date.now()+'- Received');
	response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
	http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000); */

// ================================================================
// Load the actual bot code
// ================================================================
require('./univ-bot.js');
