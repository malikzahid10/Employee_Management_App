const { Role, Permission } = require("../models");

const createPermission = async (req, res) => {
  try {
    const { permission } = req.body;

    const existPermission = await Permission.findOne({
      where: { permission: permission },
    });

    if (existPermission) {
      return res.status(409).json({
        message: "This Permission is already Exists",
      });
    }

    const newPermission = await Permission.create({ permission });

    return res.status(201).json({
      message: "Permission created Successfully!",
      newPermission,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.findAll();

    if (permissions.length === 0) {
      return res.status(400).json({
        message: "Permission not found!",
      });
    }

    return res.status(200).json({
      message: "All Permissions are Fetched",
      permissions,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getPermissionById = async (req, res) => {
  try {
    const { id } = req.params;

    const existPermission = await Permission.findOne({ where: { id: id } });

    if (!existPermission) {
      return res.status(404).json({
        message: "Permission not found!",
      });
    }

    return res.status(200).json({
      message: "Permission Fetch Successfully By Id",
      existPermission,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const updatePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const { permission } = req.body;

    const existPermission = await Permission.findOne({ where: { id: id } });

    if (!existPermission) {
      return res.status(404).json({
        message: "Permission not found!",
      });
    }

    const alreadyExistPermission = await Permission.findOne({
      where: { permission: permission },
    });

    if (alreadyExistPermission) {
      return res.status(409).json({
        message: "This Permission is already Exist",
      });
    }

    await existPermission.update({ permission });
    return res.status(200).json({
      message: "Permission update Successfully!",
      existPermission,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const deletePermission = async (req, res) => {
  try {
    const { id } = req.params;

    const permission = await Permission.findOne({ where: { id: id } });

    if (!permission) {
      return res.status(404).json({
        message: "Permission not found!",
      });
    }

    await permission.destroy();

    return res.status(200).json({
      message: "Permission Deleted Successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const attachPermission = async (req, res) => {
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
  createPermission,
  getPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
};
