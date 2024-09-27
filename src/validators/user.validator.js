import Joi from '@hapi/joi';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email().min(3).required(),
    password: Joi.string()
    .min(8)
    .max(15)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).+$'))
    .required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

export const loginUserValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(3).required(),
    password: Joi.string().min(3).required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

export const newPasswordValidator = (req, res, next) => {
  const schema = Joi.object({
    otp: Joi.string().min(5),
    newPassword: Joi.string()
    .min(8)
    .max(15)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).+$'))
    .required()
    .messages({
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
      'string.min': 'Password must be at least 8 characters long.',
      'string.max': 'Password must be no more than 15 characters long.'
    }),
   
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

