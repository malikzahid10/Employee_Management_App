const express = require("express");
const authenticateJwt = require("../passport/passport.middlewares");
const permissionAuthoraize = require("../middlewares/permissionAuthorazation");
const {
  roleValidate,
  updateRoleValidate,
} = require("../validations/role.validation");
const {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
} = require("../controllers/role.controllers");

const roleRouter = express.Router();

roleRouter.post(
  "/",
  authenticateJwt,
  permissionAuthoraize("create_role"),
  roleValidate,
  createRole,
);

roleRouter.get(
  "/",
  authenticateJwt,
  permissionAuthoraize("get_role"),
  getRoles,
);

roleRouter.get(
  "/:id",
  authenticateJwt,
  permissionAuthoraize("get_role"),
  getRoleById,
);

roleRouter.put(
  "/:id",
  authenticateJwt,
  permissionAuthoraize("update_role"),
  updateRoleValidate,
  updateRole,
);

roleRouter.delete(
  "/:id",
  authenticateJwt,
  permissionAuthoraize("delete_role"),
  deleteRole,
);

module.exports = roleRouter;
