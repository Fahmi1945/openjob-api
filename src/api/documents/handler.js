class DocumentsHandler {
    constructor(service) {
        this._service = service;

        this.postDocumentHandler = this.postDocumentHandler.bind(this);
        this.getDocumentsHandler = this.getDocumentsHandler.bind(this);
        this.getDocumentByIdHandler = this.getDocumentByIdHandler.bind(this);
        this.deleteDocumentByIdHandler = this.deleteDocumentByIdHandler.bind(this);
    }

    async postDocumentHandler(req, res, next) {
        try {
            if (!req.file) {
                return res.status(400).json({ status: 'fail', message: 'Tidak ada dokumen yang diunggah' });
            }

            const userId = req.user.id; // From authMiddleware
            const filename = req.file.originalname;
            const fileUrl = `/uploads/${req.file.filename}`;

            const documentId = await this._service.addDocument(userId, filename, fileUrl);

            res.status(201).json({ status: 'success', data: { documentId, fileUrl } });
        } catch (error) { next(error); }
    }

    async getDocumentsHandler(req, res, next) {
        try {
            const documents = await this._service.getDocuments();
            res.status(200).json({ status: 'success', data: { documents } });
        } catch (error) { next(error); }
    }

    async getDocumentByIdHandler(req, res, next) {
        try {
            const { id } = req.params;
            const document = await this._service.getDocumentById(id);
            res.status(200).json({ status: 'success', data: { document } });
        } catch (error) { next(error); }
    }

    async deleteDocumentByIdHandler(req, res, next) {
        try {
            const { id } = req.params;
            await this._service.deleteDocumentById(id);
            res.status(200).json({ status: 'success', message: 'Document dihapus' });
        } catch (error) { next(error); }
    }
}

module.exports = DocumentsHandler;