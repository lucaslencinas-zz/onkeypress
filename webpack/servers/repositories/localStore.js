let store = {};

module.exports = function localStore() {
  const self = {
    set,
    get,
    del,
    hset,
    hget,
    hdel,
    hexists,
    hgetall,
    pipeline,
    flushdb
  };

  return self;

  function set(key, value) {
    store[key] = value;

    return Promise.resolve();
  }

  function get(key) {
    return Promise.resolve(store[key]);
  }

  function del(key) {
    delete store[key];

    return Promise.resolve();
  }

  function hset(key, field, value) {
    if (store[key]) {
      store[key][field] = value;
    } else {
      store[key] = { [field]: value };
    }

    return Promise.resolve();
  }

  function hget(key, field) {
    return store[key] ? store[key][field] : undefined;
  }

  function hdel(key, field) {
    if (store[key] && store[key][field]) {
      delete store[key][field];
    }

    return Promise.resolve();
  }

  function hexists(key, field) {
    return store[key] ? Promise.resolve(!!store[key][field]) : Promise.resolve(false);
  }

  function hgetall(key) {
    return Promise.resolve(store[key]);
  }

  function pipeline() {
    const selfPipeline = {
      set: pipelineSet,
      get: pipelineGet,
      del: pipelineDel,
      hset: pipelineHset,
      hget: pipelineHget,
      hdel: pipelineHdel,
      hexists: pipelineHexists,
      hgetall: pipelineHgetall,
      exec
    };
    const responses = [];

    return selfPipeline;

    function pipelineSet(...args) {
      self.set(...args);

      return selfPipeline;
    }
    function pipelineGet(...args) {
      responses.push(self.get(...args));

      return selfPipeline;
    }
    function pipelineDel(...args) {
      self.del(...args);

      return selfPipeline;
    }
    function pipelineHset(...args) {
      self.hset(...args);

      return selfPipeline;
    }
    function pipelineHget(...args) {
      responses.push(self.hget(...args));

      return selfPipeline;
    }
    function pipelineHdel(...args) {
      self.hdel(...args);

      return selfPipeline;
    }
    function pipelineHexists(...args) {
      responses.push(self.hexists(...args));

      return selfPipeline;
    }
    function pipelineHgetall(...args) {
      responses.push(self.hgetall(...args));

      return selfPipeline;
    }
    function exec() {
      return Promise.all(responses)
        .then((responsesValues) => responsesValues.map((val) => [undefined, val]));
    }
  }

  function flushdb() {
    store = {};
  }
};
