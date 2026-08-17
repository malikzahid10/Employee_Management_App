const Joi = require("joi");

const permissionSchema = Joi.object({
  permission: Joi.string().min(3).max(50).required(),
});

const permissionValidate = (req, res, next) => {
  const { error } = permissionSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};

const updatePermissionSchema = Joi.object({
  permission: Joi.string().min(3).max(50).required(),
});

const updatePermissionValidate = (req, res, next) => {
  const { error } = updatePermissionSchema.validate(req.body, {
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
  permissionValidate,
  updatePermissionValidate,
};
