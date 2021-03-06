const dotenv = require('dotenv');

const config = {};
dotenv.config();
config.development = {
  use_env_variable: 'DEV_DATABASE_URL',
  host: '127.0.0.1',
  dialect: 'postgres',
  logging: false,
};

config.staging = {
  use_env_variable: 'DATABASE_URL',
  dialect: 'postgres',
};

config.test = {
  use_env_variable: 'DATABASE_TEST_URL',
  logging: false,
  dialect: 'postgres',
};

config.production = {
  use_env_variable: 'DATABASE_URL',
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
};

module.exports = config;
