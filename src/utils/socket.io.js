import io from 'socket.io-client';

export function createConnection(url) {
  const connection = io(url);

  return {
    on: onFunction,
    emit: emitFunction
  };

  function onFunction(eventName, callback) {
    console.log(`----- on ${eventName} -----`);
    return connection.on(eventName, callback);
  }

  function emitFunction(eventName, data) {
    console.log(`----- emit ${eventName} -----`);
    return connection.emit(eventName, data);
  }
}
