import config from 'config';
import { snake } from '~/utils/games';
import { format } from 'url';
import 'whatwg-fetch';

export function createRoom({ name, password }) {
  const room = {
    name,
    password,
    slug: name,
    ...snake
  };

  const url = format({
    ...config.api,
    pathname: `${config.api.baseUri}/rooms`
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
    ...config.api,
    pathname: `${config.api.baseUri}/rooms/${room.slug}/join`
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
