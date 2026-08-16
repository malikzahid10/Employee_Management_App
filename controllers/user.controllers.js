const { User, Role, Permission } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email: email, isActive: true },
      include: { model: Role, include: { model: Permission } },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid Email or Password!",
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    const userRoles = [];
    const userPermissions = [];

    for (const role of user.Roles) {
      userRoles.push(role.role);

      for (const permission of role.Permissions) {
        userPermissions.push(permission.permission);
      }
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        isActive: user.isActive,
        roles: userRoles,
        permissions: userPermissions,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "12H" },
    );

    return res.status(200).json({
      message: "Login Successfull!",
      access_token: token,
      id: user.id,
      email: user.email,
      isActive: user.isActive,
      roles: userRoles,
      permissions: userPermissions,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "internal Server Error",
    });
  }
};

module.exports = {
  loginUser,
};
