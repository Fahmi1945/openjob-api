class BookmarksHandler {
    constructor(service) {
        this._service = service;
        this.postBookmarkHandler = this.postBookmarkHandler.bind(this);
        this.getBookmarkByIdHandler = this.getBookmarkByIdHandler.bind(this);
        this.deleteBookmarkHandler = this.deleteBookmarkHandler.bind(this);
        this.getBookmarksHandler = this.getBookmarksHandler.bind(this);
    }

    async postBookmarkHandler(req, res, next) {
        try {
            const userId = req.user.id;
            const { jobId } = req.params;
            const bookmarkId = await this._service.addBookmark(userId, jobId);
            res.status(201).json({ status: 'success', data: { bookmarkId } });
        } catch (error) { next(error); }
    }

    async getBookmarkByIdHandler(req, res, next) {
        try {
            const { id } = req.params;
            const bookmark = await this._service.getBookmarkById(id);
            res.status(200).json({ status: 'success', data: { bookmark } });
        } catch (error) { next(error); }
    }

    async deleteBookmarkHandler(req, res, next) {
        try {
            const userId = req.user.id;
            const { jobId } = req.params;
            await this._service.deleteBookmark(userId, jobId);
            res.status(200).json({ status: 'success', message: 'Bookmark dihapus' });
        } catch (error) { next(error); }
    }

    async getBookmarksHandler(req, res, next) {
        try {
            const userId = req.user.id;
            const bookmarks = await this._service.getBookmarksByUserId(userId);
            res.status(200).json({ status: 'success', data: { bookmarks } });
        } catch (error) { next(error); }
    }
}

module.exports = BookmarksHandler;