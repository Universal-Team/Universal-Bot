module.exports = {
  name: 'release',
  usage: 'release <project>',
  permissions: [ 'dev' ],
  exec(UnivBot, msg) {
    msg.send({
      embed: {
        color: 0x00c882,
        description: 'You can get the latest release of '+msg.args+' [here](https://github.com/Universal-Team/'+msg.args+'/releases/latest)'
       }
    })
  }
}

