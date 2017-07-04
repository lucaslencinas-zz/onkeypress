import io from 'socket.io-client';

export function createConnection(url) {
  const connection = io(url);

  return {
    on: (eventName, callback) => connection.on(eventName, callback),
    emit: (eventName, data) => connection.emit(eventName, data)
  };
}
