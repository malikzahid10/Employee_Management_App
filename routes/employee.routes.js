const express = require("express");
const authenticateJwt = require("../passport/passport.middlewares");
const permissionAuthoraize = require("../middlewares/permissionAuthorazation");
const {
  employeeValidate,
  updateOwnProfileValidate,
  updateEmployeeValidate,
} = require("../validations/employee.validation");
const {
  registerEmployee,
  getOwnProfile,
  updateOwnProfile,
  getEmployees,
  getOneEmployee,
  updateEmployee,
  deleteEmployee,
  searchEmployees,
  getSalaryByEmployees,
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

employeeRouter.get(
  "/search",
  authenticateJwt,
  permissionAuthoraize("get_employee"),
  searchEmployees,
);

employeeRouter.get(
  "/salary",
  authenticateJwt,
  permissionAuthoraize("get_employee"),
  getSalaryByEmployees,
);

employeeRouter.get(
  "/:id",
  authenticateJwt,
  permissionAuthoraize("get_employee"),
  getOneEmployee,
);

employeeRouter.put(
  "/:id",
  authenticateJwt,
  permissionAuthoraize("update_employee"),
  updateEmployeeValidate,
  updateEmployee,
);

employeeRouter.delete(
  "/:id",
  authenticateJwt,
  permissionAuthoraize("delete_employee"),
  deleteEmployee,
);

module.exports = employeeRouter;
