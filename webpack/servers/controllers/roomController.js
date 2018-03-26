const roomService = require('../services/roomService');

/*
req.body: { name, slug }
*/
function create(req, res, next) {
  const room = req.body;

  return roomService.create(room)
    .then((createdRoom) => res.status(201).json(createdRoom))
    .catch(next);
}

function join(req, res, next) {
  const room = req.body.room;

  return roomService.join(room)
    .then((joinedRoom) => res.status(201).json(joinedRoom))
    .catch(next);
}

module.exports = {
  create,
  join
};
