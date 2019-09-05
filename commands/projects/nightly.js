module.exports = {
  name: 'nightly',
  usage: 'nightly <project>',
  permissions: [ 'dev' ],
  exec(UnivBot, msg) {
    msg.send({
      embed: {
        color: 0x00c882,
        description: 'You can get the latest nightly of '+msg.args+' [here](https://github.com/Universal-Team/extras/tree/master/builds/'+msg.args+')'
       }
    })
  }
}

