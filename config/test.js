const config = {
  uri: {
    hostname: process.env.HOSTNAME || '0.0.0.0',
    port: process.env.PORT || 3000
  },
  storage: {
    type: 'local'
  }
};

module.exports = config;
