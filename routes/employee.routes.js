const express = require("express");
const authenticateJwt = require("../passport/passport.middlewares");
const permissionAuthoraize = require("../middlewares/permissionAuthorazation");
const {
  employeeValidate,
  updateOwnProfileValidate,
} = require("../validations/employee.validation");
const {
  registerEmployee,
  getOwnProfile,
  updateOwnProfile,
  getEmployees,
} = require("../controllers/employee.controllers");

const employeeRouter = express.Router();

employeeRouter.post(
  "/register",
  authenticateJwt,
  permissionAuthoraize("create_employee"),
  employeeValidate,
  registerEmployee,
);

employeeRouter.get(
  "/profile",
  authenticateJwt,
  permissionAuthoraize("get_own_profile"),
  getOwnProfile,
);

employeeRouter.put(
  "/profile",
  authenticateJwt,
  permissionAuthoraize("update_own_profile"),
  updateOwnProfileValidate,
  updateOwnProfile,
);

employeeRouter.get(
  "/",
  authenticateJwt,
  permissionAuthoraize("get_employee"),
  getEmployees,
);

module.exports = employeeRouter;
