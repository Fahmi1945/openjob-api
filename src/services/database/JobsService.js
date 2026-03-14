const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../utils/exceptions/InvariantError');

class JobsService {
    constructor() {
        this._pool = new Pool();
    }

    async addJob(payload) {
        const title = payload.title;
        const description = payload.description;
        const company_id = payload.company_id || payload.companyId;
        const category_id = payload.category_id || payload.categoryId;
        const id = `job-${nanoid(16)}`;
        const query = {
            text: 'INSERT INTO jobs VALUES($1, $2, $3, $4, $5) RETURNING id',
            values: [id, title, description, company_id, category_id],
        };
        const result = await this._pool.query(query);
        if (!result.rows[0].id) throw new InvariantError('Job gagal ditambahkan');
        return result.rows[0].id;
    }

    async getJobs(title, companyName) {
        let query = `
      SELECT jobs.*, companies.name AS "companyName"
      FROM jobs
      LEFT JOIN companies ON jobs.company_id = companies.id
      WHERE 1=1
    `;
        const values = [];

        if (title) {
            values.push(`%${title}%`);
            query += ` AND jobs.title ILIKE $${values.length}`;
        }
        if (companyName) {
            values.push(`%${companyName}%`);
            query += ` AND companies.name ILIKE $${values.length}`;
        }

        const result = await this._pool.query(query, values);
        return result.rows;
    }

    async getJobById(id) {
        const query = {
            text: `SELECT jobs.*, companies.name AS "companyName"
             FROM jobs 
             LEFT JOIN companies ON jobs.company_id = companies.id
             WHERE jobs.id = $1`,
            values: [id],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) throw new InvariantError('Job tidak ditemukan');
        return result.rows[0];
    }

    async getJobsByCompanyId(companyId) {
        const query = {
            text: 'SELECT * FROM jobs WHERE company_id = $1',
            values: [companyId],
        };
        const result = await this._pool.query(query);
        return result.rows;
    }

    async getJobsByCategoryId(categoryId) {
        const query = {
            text: 'SELECT * FROM jobs WHERE category_id = $1',
            values: [categoryId],
        };
        const result = await this._pool.query(query);
        return result.rows;
    }

    async editJobById(id, payload) {
        const title = payload.title;
        const description = payload.description;
        const company_id = payload.company_id || payload.companyId;
        const category_id = payload.category_id || payload.categoryId;
        const query = {
            text: 'UPDATE jobs SET title = $1, description = $2, company_id = $3, category_id = $4 WHERE id = $5 RETURNING id',
            values: [title, description, company_id, category_id, id],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) throw new InvariantError('Gagal memperbarui job. Id tidak ditemukan');
    }

    async deleteJobById(id) {
        const query = {
            text: 'DELETE FROM jobs WHERE id = $1 RETURNING id',
            values: [id],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) throw new InvariantError('Job gagal dihapus. Id tidak ditemukan');
    }
}

module.exports = JobsService;