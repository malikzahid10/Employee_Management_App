"use strict";

const { Role, Permission } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const superAdminRole = await Role.findOne({
      where: { role: "Super Admin" },
    });

    const permission = await Permission.findAll();

    await superAdminRole.addPermissions(permission);
  },

  async down(queryInterface, Sequelize) {
    const superAdminRole = await Role.findOne({
      where: { role: "Super Admin" },
    });

    const permission = await Permission.findAll();

    await superAdminRole.removePermissions(permission);
  },
};
