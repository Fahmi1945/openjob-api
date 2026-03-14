const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../utils/exceptions/InvariantError');

class DocumentsService {
    constructor() {
        this._pool = new Pool();
    }

    async addDocument(userId, filename, fileUrl) {
        const id = `document-${nanoid(16)}`;
        const query = {
            text: 'INSERT INTO documents (id, user_id, filename, file_url) VALUES($1, $2, $3, $4) RETURNING id',
            values: [id, userId, filename, fileUrl],
        };

        const result = await this._pool.query(query);
        if (!result.rows[0].id) {
            throw new InvariantError('Document gagal ditambahkan');
        }
        return result.rows[0].id;
    }

    async getDocuments() {
        const result = await this._pool.query('SELECT * FROM documents');
        return result.rows;
    }

    async getDocumentById(id) {
        const query = {
            text: 'SELECT * FROM documents WHERE id = $1',
            values: [id],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new InvariantError('Document tidak ditemukan');
        }
        return result.rows[0];
    }

    async deleteDocumentById(id) {
        const query = {
            text: 'DELETE FROM documents WHERE id = $1 RETURNING id',
            values: [id],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new InvariantError('Document gagal dihapus. Id tidak ditemukan');
        }
    }
}

module.exports = DocumentsService;