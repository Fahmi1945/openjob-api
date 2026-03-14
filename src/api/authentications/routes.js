const express = require('express');

const routes = (handler) => {
  const router = express.Router();

  // POST /authentications -> Digunakan untuk LOGIN
  router.post('/', handler.postAuthenticationHandler);

  // PUT /authentications -> Digunakan untuk REFRESH ACCESS TOKEN
  router.put('/', handler.putAuthenticationHandler);

  // DELETE /authentications -> Digunakan untuk LOGOUT (Hapus refresh token)
  router.delete('/', handler.deleteAuthenticationHandler);

  return router;
};

module.exports = routes;