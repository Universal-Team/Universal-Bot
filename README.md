# Universal-Bot
The bot for the Universal-Team Discord server

## Running it yourself
1. Install [Node.js](https://nodejs.org)
2. In the Universal-Bot directory, run `npm install`
3. If desired, make changes to `database.json`, such as adding your ID to the `developers` array
4. Run `node univ-bot.js`

### Running in the background
5. Install `pm2` with `npm install -g pm2`
6. Start Universal-Bot with `pm2 start univ-bot.js`
