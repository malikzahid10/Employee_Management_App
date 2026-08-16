const permissionAuthoraize = (requiredPermissions) => {
  return (req, res, next) => {
    const userPermissions = req.user.permissions;

    if (!userPermissions.includes(requiredPermissions)) {
      return res.status(403).json({
        message: "You do not have Permission",
      });
    }
    next();
  };
};

module.exports = permissionAuthoraize;
