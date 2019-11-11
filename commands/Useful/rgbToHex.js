module.exports = {
  name: [ 'rgbToHex', 'rgb2hex', 'r2h' ],
  usage: '<Red> <Green> <Blue>',
  desc: 'converts 3 RGB values to a hex color',
  DM: true,
  permissions: [],
  exec(UnivBot, msg) {
    let colors = msg.args.split(' ');
    
    if (colors.length < 3)
      return msg.send('**Oops!** You didn\'t provide enough arguments');
    
    
    let hexColor = '#';
    for (let color of colors) {
      color = parseInt(color);
      
      if (color.toString() == 'NaN')
        return msg.send('Invalid numbers!');
      
      if (color > 255)
        color = 255
      else if(color < 0)
        color = 0;
      
      hexColor += color.toString(16)
                       .padStart(2, 0);
    };
    
    return msg.send({
      embed: {
        description:"Here's your hex color: `"+hexColor+"`",
        color: parseInt(hexColor.substr(1), 16)
      }
    });
  }
};