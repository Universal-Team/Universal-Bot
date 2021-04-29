"use strict";

function difference(a, b) {
	return Math.abs(a - b);
}

function closest(array, number) {
	let index = 0;
	let diffe = Infinity;
	array.forEach((int, key) => {
		let r = difference(int >> 0x10, number >> 0x10);
		let g = difference((int >> 0x8) & 0xFF, (number >> 0x8) & 0xFF);
		let b = difference(int & 0xFF, number & 0xFF);
		let average = (r + g + b) / 3;
		if(average < diffe) {
			diffe = average;
			index = key;
		}
	});
	return index;
}

const names = [
	{ name: "Maroon", decimal: 8388608 },
	{ name: "Dark Red", decimal: 9109504 },
	{ name: "Brown", decimal: 10824234 },
	{ name: "Firebrick", decimal: 11674146 },
	{ name: "Crimson", decimal: 14423100 },
	{ name: "Red", decimal: 16711680 },
	{ name: "Tomato", decimal: 16737095 },
	{ name: "Coral", decimal: 16744272 },
	{ name: "Indian Red", decimal: 13458524 },
	{ name: "Light Coral", decimal: 15761536 },
	{ name: "Dark Salmon", decimal: 15308410 },
	{ name: "Salmon", decimal: 16416882 },
	{ name: "Light Salmon", decimal: 16752762 },
	{ name: "Orange Red", decimal: 16729344 },
	{ name: "Dark Orange", decimal: 16747520 },
	{ name: "Orange", decimal: 16753920 },
	{ name: "Gold", decimal: 16766720 },
	{ name: "Dark Golden Rod", decimal: 12092939 },
	{ name: "Golden Rod", decimal: 14329120 },
	{ name: "Pale Golden Rod", decimal: 15657130 },
	{ name: "Dark Khaki", decimal: 12433259 },
	{ name: "Khaki", decimal: 15787660 },
	{ name: "Olive", decimal: 8421376 },
	{ name: "Yellow", decimal: 16776960 },
	{ name: "Yellow Green", decimal: 10145074 },
	{ name: "Dark Olive Green", decimal: 5597999 },
	{ name: "Olive Drab", decimal: 7048739 },
	{ name: "Lawn Green", decimal: 8190976 },
	{ name: "Chart Reuse", decimal: 8388352 },
	{ name: "Green Yellow", decimal: 11403055 },
	{ name: "Dark Green", decimal: 25600 },
	{ name: "Green", decimal: 32768 },
	{ name: "Forest Green", decimal: 2263842 },
	{ name: "Lime", decimal: 65280 },
	{ name: "Lime Green", decimal: 3329330 },
	{ name: "Light Green", decimal: 9498256 },
	{ name: "Pale Green", decimal: 10025880 },
	{ name: "Dark Sea Green", decimal: 9419919 },
	{ name: "Medium Spring Green", decimal: 64154 },
	{ name: "Spring Green", decimal: 65407 },
	{ name: "Sea Green", decimal: 3050327 },
	{ name: "Medium Aqua Marine", decimal: 6737322 },
	{ name: "Medium Sea Green", decimal: 3978097 },
	{ name: "Light Sea Green", decimal: 2142890 },
	{ name: "Dark Slate Gray", decimal: 3100495 },
	{ name: "Teal", decimal: 32896 },
	{ name: "Dark Cyan", decimal: 35723 },
	{ name: "Aqua", decimal: 65535 },
	{ name: "Cyan", decimal: 65535 },
	{ name: "Light Cyan", decimal: 14745599 },
	{ name: "Dark Turquoise", decimal: 52945 },
	{ name: "Turquoise", decimal: 4251856 },
	{ name: "Medium Turquoise", decimal: 4772300 },
	{ name: "Pale Turquoise", decimal: 11529966 },
	{ name: "Aqua Marine", decimal: 8388564 },
	{ name: "Powder Blue", decimal: 11591910 },
	{ name: "Cadet Blue", decimal: 6266528 },
	{ name: "Steel Blue", decimal: 4620980 },
	{ name: "Corn Flower Blue", decimal: 6591981 },
	{ name: "Deep Sky Blue", decimal: 49151 },
	{ name: "Dodger Blue", decimal: 2003199 },
	{ name: "Light Blue", decimal: 11393254 },
	{ name: "Sky Blue", decimal: 8900331 },
	{ name: "Light Sky Blue", decimal: 8900346 },
	{ name: "Midnight Blue", decimal: 1644912 },
	{ name: "Navy", decimal: 128 },
	{ name: "Dark Blue", decimal: 139 },
	{ name: "Medium Blue", decimal: 205 },
	{ name: "Blue", decimal: 250 },
	{ name: "Royal Blue", decimal: 4286945 },
	{ name: "Blue Violet", decimal: 9055202 },
	{ name: "Indigo", decimal: 4915330 },
	{ name: "Dark Slate Blue", decimal: 4734347 },
	{ name: "Slate Blue", decimal: 6970061 },
	{ name: "Medium Slate Blue", decimal: 8087790 },
	{ name: "Medium Purple", decimal: 9662683 },
	{ name: "Dark Magenta", decimal: 9109643 },
	{ name: "Dark Violet", decimal: 9699539 },
	{ name: "Dark Orchid", decimal: 10040012 },
	{ name: "Medium Orchid", decimal: 12211667 },
	{ name: "Purple", decimal: 8388736 },
	{ name: "Thistle", decimal: 14204888 },
	{ name: "Plum", decimal: 14524637 },
	{ name: "Violet", decimal: 15631086 },
	{ name: "Magenta / fuchsia", decimal: 16711935 },
	{ name: "Orchid", decimal: 14315734 },
	{ name: "Medium Violet Red", decimal: 13047173 },
	{ name: "Pale Violet Red", decimal: 14381203 },
	{ name: "Deep Pink", decimal: 16716947 },
	{ name: "Hot Pink", decimal: 16738740 },
	{ name: "Light Pink", decimal: 16758465 },
	{ name: "Pink", decimal: 16761035 },
	{ name: "Antique White", decimal: 16444375 },
	{ name: "Beige", decimal: 16119260 },
	{ name: "Bisque", decimal: 16770244 },
	{ name: "Blanched Almond", decimal: 16772045 },
	{ name: "Wheat", decimal: 16113331 },
	{ name: "Corn Silk", decimal: 16775388 },
	{ name: "Lemon Chiffon", decimal: 16775885 },
	{ name: "Light Golden Rod Yellow", decimal: 16448210 },
	{ name: "Light Yellow", decimal: 16777184 },
	{ name: "Saddle Brown", decimal: 9127187 },
	{ name: "Sienna", decimal: 10506797 },
	{ name: "Chocolate", decimal: 13789470 },
	{ name: "Peru", decimal: 13468991 },
	{ name: "Sandy Brown", decimal: 16032864 },
	{ name: "Burly Wood", decimal: 14596231 },
	{ name: "Tan", decimal: 13808780 },
	{ name: "Rosy Brown", decimal: 12357519 },
	{ name: "Moccasin", decimal: 16770229 },
	{ name: "Navajo White", decimal: 16768685 },
	{ name: "Peach Puff", decimal: 16767673 },
	{ name: "Misty Rose", decimal: 16770273 },
	{ name: "Lavender Blush", decimal: 16773365 },
	{ name: "Linen", decimal: 16445670 },
	{ name: "Old Lace", decimal: 16643558 },
	{ name: "Papaya Whip", decimal: 16773077 },
	{ name: "Sea Shell", decimal: 16774638 },
	{ name: "Mint Cream", decimal: 16121850 },
	{ name: "Slate Gray", decimal: 7372944 },
	{ name: "Light Slate Gray", decimal: 7833753 },
	{ name: "Light Steel Blue", decimal: 11584734 },
	{ name: "Lavender", decimal: 15132410 },
	{ name: "Floral White", decimal: 16775920 },
	{ name: "Alice Blue", decimal: 15792383 },
	{ name: "Ghost White", decimal: 16316671 },
	{ name: "Honeydew", decimal: 15794160 },
	{ name: "Ivory", decimal: 16777200 },
	{ name: "Azure", decimal: 15794175 },
	{ name: "Snow", decimal: 16775930 },
	{ name: "Black", decimal: 0 },
	{ name: "Dim Gray / Dim Grey", decimal: 6908265 },
	{ name: "Gray / Grey", decimal: 8421504 },
	{ name: "Dark Gray / Dark Grey", decimal: 11119017 },
	{ name: "Silver", decimal: 12632256 },
	{ name: "Light Gray / Light Grey", decimal: 13882323 },
	{ name: "Gainsboro", decimal: 14474460 },
	{ name: "White Smoke", decimal: 16119285 },
	{ name: "White", decimal: 16777215 }
];

function color(number) {
	let index = closest(
		names.map(obj => obj.decimal),
		number
	);

	return names[index];
}

module.exports = {color, names};
