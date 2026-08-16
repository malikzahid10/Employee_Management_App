const express = require("express");
const authenticateJwt = require("../passport/passport.middlewares");
const permissionAuthoraize = require("../middlewares/permissionAuthorazation");
const {
  attcahPermissionValidate,
} = require("../validations/attachPermission.validation");
const { attachPermission } = require("../controllers/permission.controllers");

const permissionRouter = express.Router();

permissionRouter.post(
  "/attachPermissions",
  authenticateJwt,
  permissionAuthoraize("assign_permission"),
  attcahPermissionValidate,
  attachPermission,
);

module.exports = permissionRouter;
