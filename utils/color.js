'use strict';

function difference(_0x01, _0x02) {
	if (_0x01 > _0x02) {
		return (_0x01 - _0x02);
	} else {
		return (_0x02 - _0x01);
	};
};

function closest(array, number) {
	let index = 0;
	let diffe = Infinity;
	array.forEach((int, key) => {
		let r = difference(int >> 0x10, number >> 0x10);
		let g = difference((int >> 0x5) & 0xFF, (number >> 0x5) & 0xFF);
		let b = difference(int & 0xFF, number & 0xFF);
		let average = (r + g + b) / 3;
		if (average < diffe) {
			diffe = average;
			index = key;
		}
	});
	return index;
}

const list = [
    { Name: 'Maroon', Decimal: 8388608 },
    { Name: 'Dark Red', Decimal: 9109504 },
    { Name: 'Brown', Decimal: 10824234 },
    { Name: 'Firebrick', Decimal: 11674146 },
    { Name: 'Crimson', Decimal: 14423100 },
    { Name: 'Red', Decimal: 16711680 },
    { Name: 'Tomato', Decimal: 16737095 },
    { Name: 'Coral', Decimal: 16744272 },
    { Name: 'Indian Red', Decimal: 13458524 },
    { Name: 'Light Coral', Decimal: 15761536 },
    { Name: 'Dark Salmon', Decimal: 15308410 },
    { Name: 'Salmon', Decimal: 16416882 },
    { Name: 'Light Salmon', Decimal: 16752762 },
    { Name: 'Orange Red', Decimal: 16729344 },
    { Name: 'Dark Orange', Decimal: 16747520 },
    { Name: 'Orange', Decimal: 16753920 },
    { Name: 'Gold', Decimal: 16766720 },
    { Name: 'Dark Golden Rod', Decimal: 12092939 },
    { Name: 'Golden Rod', Decimal: 14329120 },
    { Name: 'Pale Golden Rod', Decimal: 15657130 },
    { Name: 'Dark Khaki', Decimal: 12433259 },
    { Name: 'Khaki', Decimal: 15787660 },
    { Name: 'Olive', Decimal: 8421376 },
    { Name: 'Yellow', Decimal: 16776960 },
    { Name: 'Yellow Green', Decimal: 10145074 },
    { Name: 'Dark Olive Green', Decimal: 5597999 },
    { Name: 'Olive Drab', Decimal: 7048739 },
    { Name: 'Lawn Green', Decimal: 8190976 },
    { Name: 'Chart Reuse', Decimal: 8388352 },
    { Name: 'Green Yellow', Decimal: 11403055 },
    { Name: 'Dark Green', Decimal: 25600 },
    { Name: 'Green', Decimal: 32768 },
    { Name: 'Forest Green', Decimal: 2263842 },
    { Name: 'Lime', Decimal: 65280 },
    { Name: 'Lime Green', Decimal: 3329330 },
    { Name: 'Light Green', Decimal: 9498256 },
    { Name: 'Pale Green', Decimal: 10025880 },
    { Name: 'Dark Sea Green', Decimal: 9419919 },
    { Name: 'Medium Spring Green', Decimal: 64154 },
    { Name: 'Spring Green', Decimal: 65407 },
    { Name: 'Sea Green', Decimal: 3050327 },
    { Name: 'Medium Aqua Marine', Decimal: 6737322 },
    { Name: 'Medium Sea Green', Decimal: 3978097 },
    { Name: 'Light Sea Green', Decimal: 2142890 },
    { Name: 'Dark Slate Gray', Decimal: 3100495 },
    { Name: 'Teal', Decimal: 32896 },
    { Name: 'Dark Cyan', Decimal: 35723 },
    { Name: 'Aqua', Decimal: 65535 },
    { Name: 'Cyan', Decimal: 65535 },
    { Name: 'Light Cyan', Decimal: 14745599 },
    { Name: 'Dark Turquoise', Decimal: 52945 },
    { Name: 'Turquoise', Decimal: 4251856 },
    { Name: 'Medium Turquoise', Decimal: 4772300 },
    { Name: 'Pale Turquoise', Decimal: 11529966 },
    { Name: 'Aqua Marine', Decimal: 8388564 },
    { Name: 'Powder Blue', Decimal: 11591910 },
    { Name: 'Cadet Blue', Decimal: 6266528 },
    { Name: 'Steel Blue', Decimal: 4620980 },
    { Name: 'Corn Flower Blue', Decimal: 6591981 },
    { Name: 'Deep Sky Blue', Decimal: 49151 },
    { Name: 'Dodger Blue', Decimal: 2003199 },
    { Name: 'Light Blue', Decimal: 11393254 },
    { Name: 'Sky Blue', Decimal: 8900331 },
    { Name: 'Light Sky Blue', Decimal: 8900346 },
    { Name: 'Midnight Blue', Decimal: 1644912 },
    { Name: 'Navy', Decimal: 128 },
    { Name: 'Dark Blue', Decimal: 139 },
    { Name: 'Medium Blue', Decimal: 205 },
    { Name: 'Blue', Decimal: 250 },
    { Name: 'Royal Blue', Decimal: 4286945 },
    { Name: 'Blue Violet', Decimal: 9055202 },
    { Name: 'Indigo', Decimal: 4915330 },
    { Name: 'Dark Slate Blue', Decimal: 4734347 },
    { Name: 'Slate Blue', Decimal: 6970061 },
    { Name: 'Medium Slate Blue', Decimal: 8087790 },
    { Name: 'Medium Purple', Decimal: 9662683 },
    { Name: 'Dark Magenta', Decimal: 9109643 },
    { Name: 'Dark Violet', Decimal: 9699539 },
    { Name: 'Dark Orchid', Decimal: 10040012 },
    { Name: 'Medium Orchid', Decimal: 12211667 },
    { Name: 'Purple', Decimal: 8388736 },
    { Name: 'Thistle', Decimal: 14204888 },
    { Name: 'Plum', Decimal: 14524637 },
    { Name: 'Violet', Decimal: 15631086 },
    { Name: 'Magenta / fuchsia', Decimal: 16711935 },
    { Name: 'Orchid', Decimal: 14315734 },
    { Name: 'Medium Violet Red', Decimal: 13047173 },
    { Name: 'Pale Violet Red', Decimal: 14381203 },
    { Name: 'Deep Pink', Decimal: 16716947 },
    { Name: 'Hot Pink', Decimal: 16738740 },
    { Name: 'Light Pink', Decimal: 16758465 },
    { Name: 'Pink', Decimal: 16761035 },
    { Name: 'Antique White', Decimal: 16444375 },
    { Name: 'Beige', Decimal: 16119260 },
    { Name: 'Bisque', Decimal: 16770244 },
    { Name: 'Blanched Almond', Decimal: 16772045 },
    { Name: 'Wheat', Decimal: 16113331 },
    { Name: 'Corn Silk', Decimal: 16775388 },
    { Name: 'Lemon Chiffon', Decimal: 16775885 },
    { Name: 'Light Golden Rod Yellow', Decimal: 16448210 },
    { Name: 'Light Yellow', Decimal: 16777184 },
    { Name: 'Saddle Brown', Decimal: 9127187 },
    { Name: 'Sienna', Decimal: 10506797 },
    { Name: 'Chocolate', Decimal: 13789470 },
    { Name: 'Peru', Decimal: 13468991 },
    { Name: 'Sandy Brown', Decimal: 16032864 },
    { Name: 'Burly Wood', Decimal: 14596231 },
    { Name: 'Tan', Decimal: 13808780 },
    { Name: 'Rosy Brown', Decimal: 12357519 },
    { Name: 'Moccasin', Decimal: 16770229 },
    { Name: 'Navajo White', Decimal: 16768685 },
    { Name: 'Peach Puff', Decimal: 16767673 },
    { Name: 'Misty Rose', Decimal: 16770273 },
    { Name: 'Lavender Blush', Decimal: 16773365 },
    { Name: 'Linen', Decimal: 16445670 },
    { Name: 'Old Lace', Decimal: 16643558 },
    { Name: 'Papaya Whip', Decimal: 16773077 },
    { Name: 'Sea Shell', Decimal: 16774638 },
    { Name: 'Mint Cream', Decimal: 16121850 },
    { Name: 'Slate Gray', Decimal: 7372944 },
    { Name: 'Light Slate Gray', Decimal: 7833753 },
    { Name: 'Light Steel Blue', Decimal: 11584734 },
    { Name: 'Lavender', Decimal: 15132410 },
    { Name: 'Floral White', Decimal: 16775920 },
    { Name: 'Alice Blue', Decimal: 15792383 },
    { Name: 'Ghost White', Decimal: 16316671 },
    { Name: 'Honeydew', Decimal: 15794160 },
    { Name: 'Ivory', Decimal: 16777200 },
    { Name: 'Azure', Decimal: 15794175 },
    { Name: 'Snow', Decimal: 16775930 },
    { Name: 'Black', Decimal: 0 },
    { Name: 'Dim Gray / Dim Grey', Decimal: 6908265 },
    { Name: 'Gray / Grey', Decimal: 8421504 },
    { Name: 'Dark Gray / Dark Grey', Decimal: 11119017 },
    { Name: 'Silver', Decimal: 12632256 },
    { Name: 'Light Gray / Light Grey', Decimal: 13882323 },
    { Name: 'Gainsboro', Decimal: 14474460 },
    { Name: 'White Smoke', Decimal: 16119285 },
    { Name: 'White', Decimal: 16777215 }
];

function color(number) {
	let index = closest(
		list.map(obj => obj.Decimal),
		number
	);
	
	return list[index];
};

module.exports = color;
