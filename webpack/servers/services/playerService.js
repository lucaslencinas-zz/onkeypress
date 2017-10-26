const store = require('../storage/localStore')();

function currentPlayers(room) {
  const players = store.get('players');
  const roomPlayers = players.filter((p) => p.roomSlug === room.slug);

  return Promise.resolve(roomPlayers || []);
}

module.exports = {
  currentPlayers
};
