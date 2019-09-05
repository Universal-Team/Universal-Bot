module.exports = {
  name: 'cia',
  usage: 'cia <project>',
  permissions: [ 'dev' ],
  exec(UnivBot, msg) {
    msg.send({
      embed: {
        color: 0x00c882,
        title: 'Commands you can use with Universal-Bot:',
        fields: [
          {
            name: 'General:',
            value: '.help | Shows this message',
          },
          {
            name: 'Projects:',
             value: '.cia | Gets a QR for a cia to install\n'+
                    '.nightly | Gets the page where you can download nightlies\n'+
                    '.release | Gets the page where you can download release\n'+
                    '.site | Gets the website page'
          },
          {
            name: 'Roles:',
            value: '.role | Toggles roles'
          }
        ]
      }
    });
  }
}
