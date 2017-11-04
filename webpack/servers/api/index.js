const express = require('express');
const bodyParser = require('body-parser');
const roomController = require('../controllers/roomController');

export function api() {
  // eslint-disable-next-line new-cap
  const router = express.Router();
  router.use(bodyParser.json())
    .post('/rooms', roomController.create)
    .post('/rooms/:slug/join', roomController.join);

  return router;
}
