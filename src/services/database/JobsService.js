const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../utils/exceptions/InvariantError');
const NotFoundError = require('../../utils/exceptions/NotFoundError');

class JobsService {
    constructor() {
        this._pool = new Pool();
    }

    async addJob(payload) {
        const {
            title, description, job_type, experience_level, location_type,
            location_city, salary_min, salary_max, is_salary_visible, status
        } = payload;
        const company_id = payload.company_id || payload.companyId;
        const category_id = payload.category_id || payload.categoryId;

        const id = `job-${nanoid(16)}`;
        const query = {
            text: 'INSERT INTO jobs(id, title, description, job_type, experience_level, location_type, location_city, salary_min, salary_max, is_salary_visible, status, company_id, category_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id',
            values: [id, title, description, job_type, experience_level, location_type, location_city, salary_min, salary_max, is_salary_visible, status, company_id, category_id],
        };
        const result = await this._pool.query(query);
        if (!result.rows[0].id) throw new InvariantError('Job gagal ditambahkan');
        return result.rows[0].id;
    }

    async getJobs(title, companyName) {
        let query = `
      SELECT jobs.*, companies.name AS company_name
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
            text: `SELECT jobs.*, companies.name AS company_name
             FROM jobs 
             LEFT JOIN companies ON jobs.company_id = companies.id
             WHERE jobs.id = $1`,
            values: [id],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) throw new NotFoundError('Job tidak ditemukan');
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
        const title = payload.title !== undefined ? payload.title : null;
        const description = payload.description !== undefined ? payload.description : null;
        const job_type = payload.job_type !== undefined ? payload.job_type : null;
        const experience_level = payload.experience_level !== undefined ? payload.experience_level : null;
        const location_type = payload.location_type !== undefined ? payload.location_type : null;
        const location_city = payload.location_city !== undefined ? payload.location_city : null;
        const salary_min = payload.salary_min !== undefined ? payload.salary_min : null;
        const salary_max = payload.salary_max !== undefined ? payload.salary_max : null;
        const is_salary_visible = payload.is_salary_visible !== undefined ? payload.is_salary_visible : null;
        const status = payload.status !== undefined ? payload.status : null;

        const c_id = payload.company_id || payload.companyId;
        const company_id = c_id !== undefined ? c_id : null;

        const cat_id = payload.category_id || payload.categoryId;
        const category_id = cat_id !== undefined ? cat_id : null;

        const query = {
            text: `UPDATE jobs SET 
                title = COALESCE($1, title), 
                description = COALESCE($2, description), 
                job_type = COALESCE($3, job_type), 
                experience_level = COALESCE($4, experience_level), 
                location_type = COALESCE($5, location_type), 
                location_city = COALESCE($6, location_city), 
                salary_min = COALESCE($7, salary_min), 
                salary_max = COALESCE($8, salary_max), 
                is_salary_visible = COALESCE($9, is_salary_visible), 
                status = COALESCE($10, status), 
                company_id = COALESCE($11, company_id), 
                category_id = COALESCE($12, category_id)
            WHERE id = $13 RETURNING id`,
            values: [title, description, job_type, experience_level, location_type, location_city, salary_min, salary_max, is_salary_visible, status, company_id, category_id, id],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) throw new NotFoundError('Gagal memperbarui job. Id tidak ditemukan');
    }

    async deleteJobById(id) {
        const query = {
            text: 'DELETE FROM jobs WHERE id = $1 RETURNING id',
            values: [id],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) throw new NotFoundError('Job gagal dihapus. Id tidak ditemukan');
    }
}

module.exports = JobsService;