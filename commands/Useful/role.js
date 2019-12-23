function findRole(msg, name) {
  if(name.length > 0) {
    let possibleRoles = [];

    for (let i = 1; i < msg.guild.roles.size; i++) {
      if (msg.guild.roles.find(r => r.position == i).editable) {
        possibleRoles.push(msg.guild.roles.find(r => r.position == i).name.toLowerCase().search(name.toLowerCase()));
      }
    }
    
    for(let i in possibleRoles) {
      if(possibleRoles[i] == -1) possibleRoles[i] = Infinity;
    }

    if(Math.min.apply(Math, possibleRoles) == Infinity) return;
    return msg.guild.roles.find(r => r.position == possibleRoles.indexOf(Math.min.apply(Math, possibleRoles)) + 1);
  }
}

function hasRole(member, id) {
  if (member.roles.get(id)) {
    return true;
  } else {
    return false;
  };
};

module.exports = {
  name: 'role',
  usage: '<Role name>',
  desc: 'Adds/removes roles',
  permissions: [],
  async exec(UnivBot, msg) {
    //Setup vars
    let str1 = '\n\n__**The following roles were added:**__';
    let str1len = str1.length;
    let str2 = '\n\n__**The following roles were removed:**__';
    let str2len = str2.length;
    let str3 = '\n\n__**The following roles can\'t be added/removed:**__';
    let str3len = str3.length;
    
    // Split the roles
    var roles = msg.args.toLowerCase().split(',');
    
    // Detect empty roles
    if (roles.includes('')) {
      let possibleAdd = [];
      let possibleRemove = [];
      
      for (let i = 1; i < msg.guild.roles.size; i++) {
        if (msg.guild.roles.find(r => r.position == i).editable) {
          if(hasRole(msg.member, msg.guild.roles.find(r => r.position == i).id)) { 
            possibleRemove.push(msg.guild.roles.find(r => r.position == i).name);
          } else {
            possibleAdd.push(msg.guild.roles.find(r => r.position == i).name);
          }
        }
      }
      
      let possibleRoles = [];
      if(possibleAdd.length > 0) {
        possibleAdd.sort();
        possibleRoles.push('__**The following roles can be added:**__');
        possibleRoles = possibleRoles.concat(possibleAdd);
      }
      if(possibleRemove.length > 0) {
        if(possibleRoles.length > 0) possibleRoles.push(''); // For a newline

        possibleRemove.sort();
        possibleRoles.push('__**The following roles can be removed:**__');
        possibleRoles = possibleRoles.concat(possibleRemove);
      }
      msg.send(possibleRoles.join('\n'));
      return;
      
    }
    
    // Loop through roles
    for (var roleName of roles) {
      // If --all, toggle all roles
      if(roleName == '--all') {
        for (let i = 1; i < msg.guild.roles.size; i++) {
          if (msg.guild.roles.find(r => r.position == i).editable) {
            let role = msg.guild.roles.find(r => r.position == i);
            if (!hasRole(msg.member, role.id)) {
              // Add role and detect if it was added or not
              try {
                await msg.member.addRole(role.id);
                str1 += '\n'+role.name;
              } catch(e) {
                str3 += '\n'+role.name;
              }
            } else {
              try {
                await msg.member.removeRole(role.id);
                str2 += '\n'+role.name;
              } catch(e) {
                str3 += '\n'+role.name;
              }
            }
          }
        }
        break;
      }
      
      // Prevent @everyone from being found
      var role = findRole(msg, roleName.trim());
      if (role && (role.id == msg.guild.id)) //the id of the @everyone role is the same id of the guild/server
        role = undefined; //if this executes then it means the role was @everyone and it deletes it
      
      // Add/remove role
      if (role) {
          if (!hasRole(msg.member, role.id)) {
            // Add role and detect if it was added or not
            try {
              await msg.member.addRole(role.id);
              str1 += '\n'+role.name;
            } catch(e) {
              str3 += '\n'+role.name;
            }
          } else {
            try {
              await msg.member.removeRole(role.id);
              str2 += '\n'+role.name;
            } catch(e) {
              str3 += '\n'+role.name;
            }
          }
      } else {
          str3 += '\n'+roleName.trim(); // here role.name can't be used because if this else runs is because the role wans't found
      }
    }
    
    let str4 = ''
    if (str1.length !== str1len)
      str4 += str1;
    if (str2.length !== str2len)
      str4 += str2;
    if (str3.length !== str3len)
      str4 += str3;
    msg.send(str4);
    
  }
}

