const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const pool = require('./db');
const InvariantError = require('../../utils/exceptions/InvariantError'); // Kita akan buat ini nanti
const AuthenticationError = require('../../utils/exceptions/AuthenticationError');
const NotFoundError = require('../../utils/exceptions/NotFoundError');

class UsersService {
    async addUser({ name, email, password, role = 'user' }) {
        // 1. Verifikasi email (Syarat Unique Constraint)
        await this.verifyNewEmail(email);

        // 2. Hash password
        const id = `user-${nanoid(16)}`;
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Masukkan ke database
        const query = {
            text: 'INSERT INTO users(id, name, email, password, role) VALUES($1, $2, $3, $4, $5) RETURNING id',
            values: [id, name, email, hashedPassword, role],
        };

        const result = await pool.query(query);

        if (!result.rows.length) {
            throw new InvariantError('User gagal ditambahkan');
        }

        return result.rows[0].id;
    }

    async verifyNewEmail(email) {
        const query = {
            text: 'SELECT email FROM users WHERE email = $1',
            values: [email],
        };

        const result = await pool.query(query);

        if (result.rows.length > 0) {
            throw new InvariantError('Gagal menambahkan user. Email sudah digunakan.');
        }
    }
    async verifyUserCredential(email, password) {
        const query = {
            text: 'SELECT id, password FROM users WHERE email = $1',
            values: [email],
        };

        const result = await pool.query(query);

        if (!result.rows.length) {
            throw new AuthenticationError('Kredensial yang Anda berikan salah');
        }

        const { id, password: hashedPassword } = result.rows[0];
        const match = await bcrypt.compare(password, hashedPassword);

        if (!match) {
            throw new AuthenticationError('Kredensial yang Anda berikan salah');
        }

        return id;
    }

    async getUserById(userId) {
        const query = {
            text: 'SELECT id, email, name, role FROM users WHERE id = $1',
            values: [userId],
        };

        const result = await pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('User tidak ditemukan');
        }

        return result.rows[0];
    }
}

module.exports = UsersService;