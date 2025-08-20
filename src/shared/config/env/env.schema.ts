import Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('local', 'dev', 'prod', 'test').required(),
  PORT: Joi.number().port().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().port().required(),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  FIREBASE_TYPE: Joi.string().required(),
  FIREBASE_PROJECT_ID: Joi.string().required(),
  FIREBASE_PRIVATE_KEY_ID: Joi.string().required(),
  FIREBASE_PRIVATE_KEY: Joi.string().required(),
  FIREBASE_CLIENT_EMAIL: Joi.string().required(),
  FIREBASE_CLIENT_ID: Joi.string().required(),
  FIREBASE_AUTH_URI: Joi.string().required(),
  FIREBASE_TOKEN_URI: Joi.string().required(),
  FIREBASE_AUTH_CERT_URL: Joi.string().required(),
  FIREBASE_CLIENT_CERT_URL: Joi.string().required(),
  FIREBASE_UNIVERSAL_DOMAIN: Joi.string().required(),
  N8N_API_KEY: Joi.string().required(),
});
