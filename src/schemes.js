const Joi = require("joi");
const schemas = {
  Registration: Joi.object().keys({
    login: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    repeatedPassword: Joi.ref("password"),
  }),
  Login: Joi.object().keys({
    login: Joi.string().required(),
    password: Joi.string().required(),
  }),
  AccessToken: Joi.object().keys({
    oldAccessToken: Joi.string().required(),
  }),
};
module.exports = schemas;
