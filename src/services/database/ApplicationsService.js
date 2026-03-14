const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../utils/exceptions/InvariantError');

class ApplicationsService {
    constructor() {
        this._pool = new Pool();
    }

    async addApplication(userId, payload) {
        const id = `application-${nanoid(16)}`;
        const status = 'pending';
        const createdAt = new Date().toISOString();
        const targetJobId = payload.job_id || payload.jobId;

        const query = {
            text: 'INSERT INTO applications (id, user_id, job_id, status, created_at) VALUES($1, $2, $3, $4, $5) RETURNING id',
            values: [id, userId, targetJobId, status, createdAt],
        };

        const result = await this._pool.query(query);
        if (!result.rows[0].id) {
            throw new InvariantError('Application gagal ditambahkan');
        }
        return result.rows[0].id;
    }

    async getApplications() {
        const result = await this._pool.query('SELECT * FROM applications');
        return result.rows;
    }

    async getApplicationById(id) {
        const query = {
            text: 'SELECT * FROM applications WHERE id = $1',
            values: [id],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new InvariantError('Application tidak ditemukan');
        }
        return result.rows[0];
    }

    async getApplicationsByUserId(userId) {
        const query = {
            text: 'SELECT * FROM applications WHERE user_id = $1',
            values: [userId],
        };
        const result = await this._pool.query(query);
        return result.rows;
    }

    async getApplicationsByJobId(jobId) {
        const query = {
            text: 'SELECT * FROM applications WHERE job_id = $1',
            values: [jobId],
        };
        const result = await this._pool.query(query);
        return result.rows;
    }

    async editApplicationStatus(id, { status }) {
        const query = {
            text: 'UPDATE applications SET status = $1 WHERE id = $2 RETURNING id',
            values: [status, id],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new InvariantError('Gagal memperbarui status. Id tidak ditemukan');
        }
    }

    async deleteApplicationById(id) {
        const query = {
            text: 'DELETE FROM applications WHERE id = $1 RETURNING id',
            values: [id],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new InvariantError('Application gagal dihapus. Id tidak ditemukan');
        }
    }
}

module.exports = ApplicationsService;