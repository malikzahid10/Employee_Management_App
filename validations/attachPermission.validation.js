const Joi = require("joi");

const attachPermissionSchema = Joi.object({
  roleId: Joi.number().integer().positive().required(),
  permissionId: Joi.number().integer().positive().required(),
});

const attcahPermissionValidate = (req, res, next) => {
  const { error } = attachPermissionSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};

module.exports = {
  attcahPermissionValidate,
};
