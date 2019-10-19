
let rulesBrief = [
  "The usual stuff",
  "No Piracy",
  "Don't ask to ask",
  "Don't ping roles",
  "Bot commands in <#587664918560505896>",
  "English is the main language",
  "No NSFW, politics, etc.",
  "Evading the rules is breaking the rules"
];

let rules = [
  "The usual stuff: No spamming, or just general s***posting, and please keep swearing to a minimum. Use <#620406977490714626> if you wish to do any of that.",
  "No copyrighted content: You can post homebrew and stuff, but no copyrighted ROMs or any other forms of copyrighted material. Don't talk about piracy please. Also: If you talk about SX OS, you will get a warning. If you continue, you will be banned! (Please use [Atmosphère](https://github.com/Atmosphere-NX/Atmosphere) instead)",
  "If you have a troubleshooting question, just ask it and wait until someone replies to your question, don't ask if you can ask. <#568121785456001067> is the best place to ask for assistance.",
  "Please don't ping roles.",
  "Bot commands not related to the current conversation should go in <#587664918560505896>",
  "English is the primary language here, so use <#626505843654918154> for random things in other languages.",
  "This is a homebrew server and as such is not the place for NSFW, politics, or anything else like that, please just treat each other respectfully and keep stuff like that in other servers. (This includes no NSFW names or profile pictures)",
  "Trying to evade the rules is the same as breaking them and will be treated as such"
];

function findRule(name) {
  if(name.length > 0) {
    let possibleRules = [];
    for(let i=0;i<rules.length;i++) {
      possibleRules.push(rules[i].toLowerCase().search(name.toLowerCase()));
    }
    
    for(let i in possibleRules) {
    if(possibleRules[i] == -1) possibleRules[i] = Infinity;
    }

    return possibleRules.indexOf(Math.min.apply(Math, possibleRules)) + 1;
  }
}
module.exports = {
  name: 'rule',
  usage: '<rule>',
  desc: 'Sends the specified rule',
  DM: true,
  permissions: [],
  exec(UnivBot, msg) {
    let ruleNo = Number(msg.args);
    if(isNaN(ruleNo)) {
      ruleNo = findRule(msg.args);
    }
    
    if(ruleNo <= rules.length && ruleNo > 0) {
      msg.send({
        embed: {
          color: 0x00c882,
          title: "Rule "+ruleNo,
          description: rules[ruleNo-1],
        }
      });
    } else {
      let rList = "";
      for(let i=0;i<rulesBrief.length;i++) {
        rList += "**"+(Number(i)+1).toString()+".** "+rulesBrief[i]+"\n";
      }
      
      msg.send({
        embed: {
          color: 0x00c882,
          title: "Rule list",
          description: rList,
        }
      });
    }
  }
};
