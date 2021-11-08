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

### .env
You must have a file called `.env` with the API tokens Universal-Bot uses:
- `TOKEN` Discord token, needed for the bot to work at all
- `DEEPL_TOKEN` [DeepL free](https://www.deepl.com) token, for ?translate
- `CURRENCY_TOKEN` [Free Currency Converter API](https://free.currencyconverterapi.com) token, for ?currency

### Required programs
You will also need to install the following programs (and have them in your PATH) for the commands they're used in to work:

- `qrencode` for ?qr and ?binaryQR
- `zbarimg` for ?qrDecode
- `ffmpeg` for ?twilightBGM
- `gcc`/`g++` for ?c and ?cpp
- `python`/`python3` for ?py and ?py3
- `bash`/`sh` for ?bash and ?sh
- `tsc` for ?typescript
- `pm2` for ?reboot (bot must be run from pm2)
- `cowsay`/`cowthink` for ?cowsay and ?cowthink
