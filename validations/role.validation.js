const Joi = require("joi");

const roleSchema = Joi.object({
  role: Joi.string().min(1).required(),
});

const roleValidate = (req, res, next) => {
  const { error } = roleSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};

const updateRoleSchema = Joi.object({
  role: Joi.string().min(1).required(),
});

const updateRoleValidate = (req, res, next) => {
  const { error } = updateRoleSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};

module.exports = {
  roleValidate,
  updateRoleValidate,
};
