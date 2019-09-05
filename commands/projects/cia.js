module.exports = {
  name: 'cia',
  usage: 'cia <project>',
  permissions: [ 'dev' ],
  exec(UnivBot, msg) {
    msg.send({
      files: [
        'https://raw.githubusercontent.com/Universal-Team/extras/master/builds/'+msg.args+'/'+msg.args+'.png'
      ]
    })
  }
}
