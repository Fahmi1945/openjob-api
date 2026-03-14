const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');

const routes = (handler) => {
    const router = express.Router();

    // All endpoints are Protected
    router.post('/', authMiddleware, handler.postApplicationHandler);
    router.get('/', authMiddleware, handler.getApplicationsHandler);
    router.get('/:id', authMiddleware, handler.getApplicationByIdHandler);
    router.get('/user/:userId', authMiddleware, handler.getApplicationsByUserIdHandler);
    router.get('/job/:jobId', authMiddleware, handler.getApplicationsByJobIdHandler);
    router.put('/:id', authMiddleware, handler.putApplicationStatusHandler);
    router.delete('/:id', authMiddleware, handler.deleteApplicationByIdHandler);

    return router;
};

module.exports = routes;