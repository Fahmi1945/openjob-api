const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../utils/exceptions/InvariantError');

class CompaniesService {
    constructor() {
        this._pool = new Pool();
    }

    async addCompany({ name, description, owner_id }) {
        const id = `company-${nanoid(16)}`;
        const query = {
            text: 'INSERT INTO companies VALUES($1, $2, $3, $4) RETURNING id',
            values: [id, name, description, owner_id],
        };

        const result = await this._pool.query(query);
        if (!result.rows[0].id) {
            throw new InvariantError('Company gagal ditambahkan');
        }
        return result.rows[0].id;
    }

    async getCompanies() {
        const result = await this._pool.query('SELECT * FROM companies');
        return result.rows;
    }

    async getCompanyById(id) {
        const query = {
            text: 'SELECT * FROM companies WHERE id = $1',
            values: [id],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new InvariantError('Company tidak ditemukan');
        }
        return result.rows[0];
    }

    async editCompanyById(id, { name, description }) {
        const query = {
            text: 'UPDATE companies SET name = $1, description = $2 WHERE id = $3 RETURNING id',
            values: [name, description, id],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new InvariantError('Gagal memperbarui company. Id tidak ditemukan');
        }
    }

    async deleteCompanyById(id) {
        const query = {
            text: 'DELETE FROM companies WHERE id = $1 RETURNING id',
            values: [id],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new InvariantError('Company gagal dihapus. Id tidak ditemukan');
        }
    }
}

module.exports = CompaniesService;