const { Role, Permission } = require("../models");

const attachPermission = async (req, res, next) => {
  try {
    const { roleId, permissionId } = req.body;
    const role = await Role.findOne({ where: { id: roleId } });

    if (!role) {
      return res.status(404).json({
        message: "Role not Found!",
      });
    }

    const permission = await Permission.findOne({
      where: { id: permissionId },
    });

    if (!permission) {
      return res.status(404).json({
        message: "Permission not Found!",
      });
    }

    const alreadyAssignPermission = await role.hasPermission(permission);
    if (alreadyAssignPermission) {
      return res.status(409).json({
        message: "This Role has alreday this Permission",
      });
    }

    await role.addPermissions(permission);
    return res.status(201).json({
      message: "Permission has successfully assign to Role",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

module.exports = {
  attachPermission,
};
