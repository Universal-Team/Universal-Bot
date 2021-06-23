module.exports = {
	name: "minesweeper",
	usage: "[--__m__ines]",
	desc: "Generates a spoiler-based minesweeper board",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		const numbers = ["🟦", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣"];

		let board = [];
		let width = 9;
		let height = 9;
		let mines = Math.min(msg.args.mines ?? msg.args.m ?? Math.round(width * height / 7), width * height - 1);

		for(let i = 0; i < height; i++) {
			board[i] = [];
		}

		for(let i = 0; i < mines; i++) {
			let x, y;
			do {
				x = Math.floor(Math.random() * width);
				y = Math.floor(Math.random() * height);
			} while(board[y][x] != undefined);

			board[y][x] = "||💣||";
		}

		for(let i = 0; i < height; i++) {
			for(let j = 0; j < width; j++) {
				if(board[i][j] == undefined) {
					let mines = 0;
					for(let y = (i == 0 ? 0 : -1); y <= (i == height - 1 ? 0 : 1); y++) {
						for(let x = (j == 0 ? 0 : -1); x <= (j == width - 1 ? 0 : 1); x++) {
							if(board[i + y][j + x] == "||💣||")
								mines++;
						}
					}
					board[i][j] = `||${numbers[mines]}||`;
				}
			}
		}

		let out = "";
		for(let row of board) {
			out += row.join(" ") + "\n";
		}

		msg.send(out);
	}
}
