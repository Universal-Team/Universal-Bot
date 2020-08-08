# Universal-Bot
The bot for the Universal-Team Discord server

## Running it yourself
1. Install [Node.js](https://nodejs.org)
2. In the Universal-Bot directory, run `npm install`
3. Create a file called `.env` with `TOKEN="put your bot token here"`
  - You can make a bot at the [Discord Developer Portal](https://discord.com/developers/applications)
    1. Click `New Application` in the top right
    2. Click `Bot` in the sidebar
    3. Click `Add Bot`
    4. Click `Copy` to copy the token
4. If desired, make changes to `database.json`, such as adding your ID to the `developers` array
5. Run `node univ-bot.js`

### Running in the background
6. Install `pm2` with `npm install -g pm2`
7. Start Universal-Bot with `pm2 start univ-bot.js`
