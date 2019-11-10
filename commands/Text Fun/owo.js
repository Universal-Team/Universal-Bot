module.exports = {
 name: ['owo', 'owoify'],
 usage: '<Text>',
 desc: 'Makes a message look like OWO',
 DM: true,
 permissions: [],
 exec(UnivBot, msg) {
  if (!msg.args.length)
    return msg.send('No owo fow you');
   
  msg.send('**' + msg.author.tag + '**: ' + OwOify(msg.args));
 }
};

function OwOify(text) {
 return text
  .replace('speak', 'spweak')
  .replace('need', 'nweed')
  .replace('stand', 'stwand')
  .replace(/[rl]/gm, "w")
  .replace(/[RL]/gm, "W")
  .replace(/ove/g, 'uv')
  .trim();
};