const roomService = require('../services/roomService');

/*
req.body: { name, password, slug, availableButtons }
*/
function post(req, res) {
  const room = req.body;

  return roomService.create(room)
    .then((createdRoom) => res.status(201).json(createdRoom));
}

function join(req, res) {
  const room = req.body.room;
  const player = req.body.player;

  return roomService.join(room, player)
    .then((joinedRoom) => res.status(201).json(joinedRoom));
}

module.exports = {
  post,
  join
};
