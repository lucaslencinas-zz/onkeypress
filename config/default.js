const ENV = process.env.NODE_ENV || 'development';

const config = {
  env: ENV,
  uri: {
    hostname: process.env.HOSTNAME || '0.0.0.0',
    port: process.env.PORT || 3000
  }
};

module.exports = config;
