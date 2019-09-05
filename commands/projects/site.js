module.exports = {
  name: 'site',
  usage: 'site <project>',
  permissions: [ 'dev' ],
  exec(UnivBot, msg) {
    msg.send({
      embed: {
        color: 0x00c882,
        description: msg.args+'\'s page is [here](https://universal-team.github.io/'+msg.args+')'
       }
    })
  }
}

