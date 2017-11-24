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
  },
  games: {
    snake: {
      initialState: {
        snakePosition: [{ x: 7, y: 4 }, { x: 6, y: 4 }, { x: 5, y: 4 }, { x: 4, y: 4 }, { x: 3, y: 4 }],
        foodPosition: { x: 20, y: 20 },
        score: 0,
        status: 'waiting',
        direction: 'RIGHT',
        speed: 100
      }
    }
  }
};

const clientConfig = {
  api: {
    hostname: config.uri.hostname,
    port: config.uri.port,
    baseUri: config.api.baseUri
  },
  games: config.games
};

config.client = clientConfig;

module.exports = config;
