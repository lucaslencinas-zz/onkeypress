import 'whatwg-fetch';

const games = [{
  name: 'snake',
  description: 'snake game',
  link: 'http://snake-link.com',
  types: ['multiplayer', 'singleplayer'],
  teamSizes: [1, 2, 4]
}];

export function getGames() {
  return Promise.resolve(games);
}

// Here is when you call the API for getting the games for example
