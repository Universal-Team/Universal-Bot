
const charsets = {
  b16: [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' ],
  rgb: [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ' ' ],
  int: [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ],
  hex: [ 'a', 'b', 'c', 'd', 'e', 'f' ]
};

const color = require('/app/utils/color');

module.exports = {
  name: [ 'color', 'color-code' ],
  usage: '<Hex color> or <RGB color> or <Decimal color>',
  desc: 'parses a hex, rgb or decimal color and converts it',
  DM: true,
  permissions: [],
  exec(UnivBot, msg) {
    let string = msg.args.toLowerCase().replace(/\s\s+/g, ' ');
    let colorInt;
    
    if (!string.length)
      return msg.send('**Error:** You must specify a value');
    
    if (string.startsWith('#') || string.startsWith('0x') || string.madeOf(charsets.hex)) {
      string = string.replace(/#/g, '').replace(/0x/g, '').replace(/\s/g, '');
      
      if (string.length < 6)
        string = '000000'.substr(0, 6 - string.length) + string;
      
      if (string.length > 6 || !string.madeOf(charsets.b16))
        return msg.send('**Error:** You inserted an invalid HEX color');
      
      colorInt = parseInt(string, 16);
    };
    
    if (!colorInt && string.madeOf(charsets.rgb) && string.split(' ').length == 3) {
      string = string.split(' ');
      
      colorInt += parseInt(string[0].toString(16), 16).toString();
      colorInt += parseInt(string[1].toString(16), 16).toString();
      colorInt += parseInt(string[2].toString(16), 16).toString();
      
      string = string.join(' ');
    };
    
    string = string.replace(/\s/g, '');
    if (!colorInt)
      colorInt = parseInt(string);
    
    if (!colorInt.toString().madeOf(charsets.int) || colorInt > 16777215)
      return msg.send('**Error:** You inserted an invalid Decimal color')
    
    let hex = colorInt.toString(16);
    hex = '000000'.substr(0, 6 - hex.length) + hex;
    
    let red = parseInt(hex[0]+hex[1], 16);
    let green = parseInt(hex[2]+hex[3], 16);
    let blue = parseInt(hex[4]+hex[5], 16);
  
    let rgb = [];
    rgb[0] = red;
    rgb[1] = green;
    rgb[2] = blue;
    rgb = '``RGB ' + rgb.join(' ') + '``';
    
    let bgr15 = [];
    bgr15[0] = red * 31/255;
    bgr15[1] = green * 31/255;
    bgr15[2] = blue * 31/255;
    bgr15 = ((bgr15[2]&31) << 10 | (bgr15[1]&31) << 5 | (bgr15[0]&31));
    bgr15 = '``0x'+bgr15.toString(16)+'``\n``0x'+(bgr15 | 1 << 15).toString(16)+'``';
    
    hex = '``#' + hex + '``';
    
    let name = color(colorInt);
    return msg.send({
      embed: {
        title: `Color: ${name.Name}`, 
        description: `**HEX Color**
${hex}

**RGB Color**
${rgb}

**BGR15 Color**
${bgr15}

**Decimal color**
\`\`${colorInt}\`\``,
        color: colorInt
      }
    });
  }
};