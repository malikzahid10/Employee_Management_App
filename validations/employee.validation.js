const Joi = require("joi");

const userEmployeeSchema = Joi.object({
  userName: Joi.string().min(3).max(40).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(20).required(),
  isActive: Joi.boolean().optional(),
  firstName: Joi.string().min(3).max(40).required(),
  lastName: Joi.string().min(3).max(40).required(),
  department: Joi.string().min(1).required(),
  salary: Joi.number().positive().required(),
});

const updateOwnProfileSchema = Joi.object({
  firstName: Joi.string().min(3).max(40).optional(),
  lastName: Joi.string().min(3).max(40).optional(),
});

const employeeValidate = (req, res, next) => {
  const { error } = userEmployeeSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};

const updateOwnProfileValidate = (req, res, next) => {
  const { error } = updateOwnProfileSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};

const updateEmployeeSchema = Joi.object({
  firstName: Joi.string().min(3).max(40).optional(),
  lastName: Joi.string().max(40).min(3).optional(),
  department: Joi.string().min(1).optional(),
  salary: Joi.number().positive().optional(),
});

const updateEmployeeValidate = (req, res, next) => {
  const { error } = updateEmployeeSchema.validate(req.body, {
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
  employeeValidate,
  updateOwnProfileValidate,
  updateEmployeeValidate,
};
