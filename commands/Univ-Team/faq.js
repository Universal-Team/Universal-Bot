module.exports = {
  name: 'faq',
  usage: '<faq>',
  desc: 'Sends the specified faq',
  DM: true,
  permissions: [],
  exec(UnivBot, msg) {
    let faqNo = Number(msg.args);
    
    let questions = [
      "How do I get a notification role?",
      "What is Relaunch?",
    ]
    
    let answers = [
      "To get a notification role for one of our projects, use ?role in <#587664918560505896>",
      "Relaunch is an Unlaunch lookalike that lets you boot other apps by holding hotkeys",
    ]
    
    if(faqNo <= questions.length && faqNo > 0) {
      msg.send({
        embed: {
          color: 0x00c882,
          title: "FAQ "+faqNo+": "+questions[faqNo-1],
          description: answers[faqNo-1],
        }
      });
    } else {
      let qList = "";
      for(let i=0;i<questions.length;i++) {
        qList += "**"+(Number(i)+1).toString()+".** "+questions[i]+"\n";
      }
      
      msg.send({
        embed: {
          color: 0x00c882,
          title: "FAQ list",
          description: qList,
        }
      });
    }
  }
};
