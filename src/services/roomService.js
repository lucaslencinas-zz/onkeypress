import { format } from 'url';
import 'whatwg-fetch';

export function createRoom({ name, password }) {
  const room = {
    name,
    password,
    slug: name,
    maxPlayers: 4,
    buttons: ['UP', 'DOWN', 'LEFT', 'RIGHT']
  };

  const url = format({
    hostname: '0.0.0.0',
    port: 3000,
    pathname: 'api/v1/rooms'
  });

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(room)
  })
  .then(checkStatus)
  .then(() => room);
}

export function joinRoom({ room, player }) {
  const url = format({
    hostname: '0.0.0.0',
    port: 3000,
    pathname: `api/v1/rooms/${room.slug}/join`
  });

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ room, player })
  })
  .then(checkStatus)
  .then(() => ({ room, player }));
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
