const express = require('express');

const routes = (handler) => {
  const router = express.Router();

  router.post('/', handler.postUserHandler);
  router.get('/:id', handler.getUserByIdHandler); // Menambahkan route GET user by id

  return router;
};

module.exports = routes;