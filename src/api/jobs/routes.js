const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');

const routes = (handler) => {
    const router = express.Router();

    // Public
    router.get('/', handler.getJobsHandler);
    router.get('/:id', handler.getJobByIdHandler);
    router.get('/company/:companyId', handler.getJobsByCompanyHandler);
    router.get('/category/:categoryId', handler.getJobsByCategoryHandler);

    // Protected
    router.post('/', authMiddleware, handler.postJobHandler);
    router.put('/:id', authMiddleware, handler.putJobByIdHandler);
    router.delete('/:id', authMiddleware, handler.deleteJobByIdHandler);

    return router;
};

module.exports = routes;