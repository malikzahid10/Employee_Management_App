const authoraizeRoles = (requiredRoles) => {
  return (req, res, next) => {
    const userRoles = req.user.roles;

    const hasRoles = userRoles.some((role) => requiredRoles.includes(role));

    if (!hasRoles) {
      return res.status(403).json({
        message: "You are UnAuthoraize!",
      });
    }
    next();
  };
};

module.exports = authoraizeRoles;
