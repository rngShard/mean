const Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  SERVER_PROTOCOL: Joi.string()
    .default('http'),
  SERVER_HOSTNAME: Joi.string()
    .default('localhost'),
  SERVER_PORT: Joi.number()
    .default(4040),
  MONGOOSE_DEBUG: Joi.boolean()
    .when('NODE_ENV', {
      is: Joi.string().equal('development'),
      then: Joi.boolean().default(true),
      otherwise: Joi.boolean().default(false)
    }),
  JWT_SECRET: Joi.string().required()
    .description('JWT Secret required to sign'),
  MONGO_HOST: Joi.string().required()
    .description('Mongo DB host url'),
  MONGO_PORT: Joi.number()
    .default(27017),
  SYS_ACC_ADMIN_EMAIL: Joi.string().email()
    .default('admin@system.com'),
  SYS_ACC_ADMIN_PW: Joi.string()
    .description('Strong password for system admin account'),
  SYS_ACC_TEST_EMAIL: Joi.string().email()
    .default('test@system.com'),
  SYS_ACC_TEST_PW: Joi.string()
    .description('Password for system test account'),
  MAIL_SERVICE: Joi.string(),
  MAIL_AUTH_USER: Joi.string().email(),
  MAIL_AUTH_PASS: Joi.string()
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  protocol: envVars.SERVER_PROTOCOL,
  hostname: envVars.SERVER_HOSTNAME,
  port: envVars.SERVER_PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  jwtSecret: envVars.JWT_SECRET,
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT
  },
  sysAccAdmin: {
    username: 'admin',
    email: envVars.SYS_ACC_ADMIN_EMAIL,
    password: envVars.SYS_ACC_ADMIN_PW,
    repeatPassword: envVars.SYS_ACC_ADMIN_PW
  },
  sysAccTest: {
    username: 'test',
    email: envVars.SYS_ACC_TEST_EMAIL,
    password: envVars.SYS_ACC_TEST_PW,
    repeatPassword: envVars.SYS_ACC_TEST_PW
  },
  mail: {
    service: envVars.MAIL_SERVICE,
    auth: {
      user: envVars.MAIL_AUTH_USER,
      pass: envVars.MAIL_AUTH_PASS
    }
  }
};

module.exports = config;
