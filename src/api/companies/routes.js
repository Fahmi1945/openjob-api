const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');

const routes = (handler) => {
    const router = express.Router();

    // Public
    router.get('/', handler.getCompaniesHandler);
    router.get('/:id', handler.getCompanyByIdHandler);

    // Protected
    router.post('/', authMiddleware, handler.postCompanyHandler);
    router.put('/:id', authMiddleware, handler.putCompanyByIdHandler);
    router.delete('/:id', authMiddleware, handler.deleteCompanyByIdHandler);

    return router;
};

module.exports = routes;