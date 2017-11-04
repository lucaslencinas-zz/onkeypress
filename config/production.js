const config = {
  uri: {
    hostname: process.env.HOSTNAME || '0.0.0.0',
    port: process.env.PORT || 3000
  },
  storage: {
    type: 'redis',
    redis: {
      host: process.env.REDIS_HOST || 'ec2-34-235-35-224.compute-1.amazonaws.com',
      port: 63819,
      password: 'pf5d7c690cb7f490dedca9d207327843fb8830f3679e51ff7deb220d24c9ab9d7' // Remove it from here. put it in another file
    }
  }
};

module.exports = config;
