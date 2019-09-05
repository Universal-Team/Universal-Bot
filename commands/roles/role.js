module.exports = {
  name: 'role',
  usage: 'role <role>',
  permissions: [ 'dev' ],
  exec(UnivBot, msg) {
    var roles = msg.args.toLowerCase().split(',');
    for(var roleName in roles) {
      var role = msg.guild.roles.find(r => r.name.toLowerCase().startsWith(roles[roleName].trim()));
      if (role) {
        if (!msg.member.roles.get(role.id)) {
          msg.member.addRole(role.id);
          msg.send('Added '+role.name+' role');
        } else {
          msg.member.removeRole(role.id);
          msg.send('Removed '+role.name+' role');
        }
      } else {
        msg.send('Couldn\'t find '+roles[roleName].trim()+' role');
      }
    }
  }
}
