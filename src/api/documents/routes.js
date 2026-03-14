const express = require('express');
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../../middleware/authMiddleware');

// Setup multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Simpan di folder root uploads/
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

const routes = (handler) => {
    const router = express.Router();

    // Public
    router.get('/', handler.getDocumentsHandler);
    router.get('/:id', handler.getDocumentByIdHandler);

    // Protected & Multipart Form Data
    router.post('/', authMiddleware, upload.single('document'), handler.postDocumentHandler);
    router.delete('/:id', authMiddleware, handler.deleteDocumentByIdHandler);

    return router;
};

module.exports = routes;