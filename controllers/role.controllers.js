const { Role } = require("../models");

const createRole = async (req, res) => {
  try {
    const { role } = req.body;

    const existRole = await Role.findOne({ where: { role: role } });

    if (existRole) {
      return res.status(409).json({
        message: "This Role is already Exist",
      });
    }

    const newRole = await Role.create({
      role,
    });

    return res.status(201).json({
      message: "Roles created Successfully!",
      newRole,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();

    if (roles.length === 0) {
      return res.status(404).json({
        message: "Roles not found",
      });
    }

    return res.status(200).json({
      message: "Roles Fetch Successfully!",
      roles,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;

    const role = await Role.findOne({ where: { id: id } });

    if (!role) {
      return res.status(404).json({
        message: "Role not found!",
      });
    }
    return res.status(200).json({
      message: "Role fetch Successfully!",
      role,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const existRole = await Role.findOne({ where: { id: id } });

    if (!existRole) {
      return res.status(404).json({
        message: "Role not found!",
      });
    }

    const alreadyExistRole = await Role.findOne({ where: { role: role } });

    if (alreadyExistRole) {
      return res.status(409).json({
        message: "This Role is already Exist.",
      });
    }

    await existRole.update({ role });

    return res.status(200).json({
      message: "role update successfully!",
      existRole,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    const existRole = await Role.findOne({ where: { id: id } });

    if (!existRole) {
      return res.status(404).json({
        message: "Role not Found!",
      });
    }

    await existRole.destroy();

    return res.status(200).json({
      message: "Role deleted Successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
