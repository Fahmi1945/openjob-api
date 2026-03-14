const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');

const routes = (handler) => {
    const router = express.Router();

    router.get('/bookmarks', authMiddleware, handler.getBookmarksHandler);
    router.post('/jobs/:jobId/bookmark', authMiddleware, handler.postBookmarkHandler);
    router.get('/jobs/:jobId/bookmark/:id', authMiddleware, handler.getBookmarkByIdHandler);
    router.get('/jobs/:jobId/bookmarks', authMiddleware, handler.getBookmarksHandler);
    router.delete('/jobs/:jobId/bookmark', authMiddleware, handler.deleteBookmarkHandler);

    return router;
};

module.exports = routes;