const config = {
  uri: {
    hostname: process.env.HOSTNAME || '0.0.0.0',
    port: process.env.PORT || 3000
  },
  api: {
    baseUri: '/api/v1'
  },
  storage: {
    type: 'redis',
    redis: {
      host: process.env.REDIS_HOST || '127.0.0.1'
    }
  }
};

const clientConfig = {
  api: {
    hostname: config.uri.hostname,
    port: config.uri.port,
    baseUri: config.api.baseUri
  }
};

config.client = clientConfig;

module.exports = config;
