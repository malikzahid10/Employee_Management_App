const express = require("express");
const authenticateJwt = require("../passport/passport.middlewares");
const permissionAuthoraize = require("../middlewares/permissionAuthorazation");
const {
  attcahPermissionValidate,
} = require("../validations/attachPermission.validation");
const {
  attachPermission,
  createPermission,
  getPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
} = require("../controllers/permission.controllers");
const {
  permissionValidate,
  updatePermissionValidate,
} = require("../validations/permission.validation");

const permissionRouter = express.Router();

permissionRouter.post(
  "/",
  authenticateJwt,
  permissionAuthoraize("create_permission"),
  permissionValidate,
  createPermission,
);

permissionRouter.get(
  "/",
  authenticateJwt,
  permissionAuthoraize("get_permission"),
  getPermissions,
);

permissionRouter.post(
  "/attachPermissions",
  authenticateJwt,
  permissionAuthoraize("assign_permission"),
  attcahPermissionValidate,
  attachPermission,
);

permissionRouter.get(
  "/:id",
  authenticateJwt,
  permissionAuthoraize("get_permission"),
  getPermissionById,
);

permissionRouter.put(
  "/:id",
  authenticateJwt,
  permissionAuthoraize("update_permission"),
  updatePermissionValidate,
  updatePermission,
);

permissionRouter.delete(
  "/:id",
  authenticateJwt,
  permissionAuthoraize("delete_permission"),
  deletePermission,
);

module.exports = permissionRouter;
