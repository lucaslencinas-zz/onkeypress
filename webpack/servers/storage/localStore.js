import 'whatwg-fetch';

module.exports = function localStore() {
  const store = { rooms: [], players: [] };
  const self = {
    set,
    get
  };

  return self;

  function set(key, value) {
    store[key] = value;
    return self;
  }

  function get(key) {
    return store[key];
  }
};
