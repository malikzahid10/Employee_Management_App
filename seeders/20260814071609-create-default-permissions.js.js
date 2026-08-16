"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Permissions", [
      {
        permission: "create_employee",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permission: "get_employee",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permission: "update_employee",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permission: "delete_employee",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permission: "create_role",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permission: "get_role",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permission: "update_role",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permission: "delete_role",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permission: "create_permission",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permission: "get_permission",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permission: "update_permission",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permission: "delete_permission",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permission: "assign_permission",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permission: "assign_role",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permission: "get_own_profile",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permission: "update_own_profile",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Permissions", null, {});
  },
};
