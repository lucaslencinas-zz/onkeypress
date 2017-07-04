let sockets = [];

export function initializeSocketConnection(io) {
  io.on('connection', (socket) => {
    initialize(socket);
  });
}

function initialize(socket) {
  socket.on('user-connected', (handshake) => handleUserConnected(socket, handshake));
  socket.on('new-message', (msg) => handleNewMessage(socket, msg));
  socket.on('disconnect', () => handleDisconnect(socket));
}

function handleUserConnected(socket, handshake) {
  sockets.push({ id: socket.id, user: handshake.user });
  socket.broadcast.emit('user-connected', handshake.user);
  socket.emit('current-users', sockets.map((s) => s.user));
}

function handleNewMessage(socket, msg) {
  socket.broadcast.emit('new-message', msg);
}

function handleDisconnect(socket) {
  const element = sockets.find((s) => s.id === socket.id);
  if (element) {
    sockets = sockets.filter((s) => s.id !== socket.id);
    socket.broadcast.emit('user-disconnected', element.user);
  }
}
