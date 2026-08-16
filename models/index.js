const Employee = require("./employee.model");
const Permission = require("./permission.model");
const Role = require("./role.model");
const User = require("./user.model");

User.hasOne(Employee);
Employee.belongsTo(User);

User.belongsToMany(Role, { through: "User_Has_Roles" });
Role.belongsToMany(User, { through: "User_Has_Roles" });

Role.belongsToMany(Permission, { through: "Role_Has_Permission" });
Permission.belongsToMany(Role, { through: "Role_Has_Permission" });

module.exports = {
  User,
  Employee,
  Role,
  Permission,
};
