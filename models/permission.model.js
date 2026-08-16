const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Permission = sequelize.define(
  "Permission",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    permission: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  { timestamps: true },
);

module.exports = Permission;
