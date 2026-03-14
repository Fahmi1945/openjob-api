const Jwt = require('jsonwebtoken');
const AuthenticationError = require('../utils/exceptions/AuthenticationError');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AuthenticationError('Token tidak ditemukan atau format salah');
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verifikasi menggunakan secret key dari .env
    const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    
    // Simpan id user ke objek req agar bisa dipakai di handler selanjutnya
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    throw new AuthenticationError('Token tidak valid atau sudah kadaluarsa');
  }
};

module.exports = authMiddleware;