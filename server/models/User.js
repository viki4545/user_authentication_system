import Joi from "joi";

export const userSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  gender: Joi.string().valid("Male", "Female", "Other").required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  profile_image: Joi.string().uri().required(),
});
