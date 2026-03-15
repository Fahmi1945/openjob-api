class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    // Bind methods agar 'this' tidak hilang saat dipanggil Express
    this.postUserHandler = this.postUserHandler.bind(this);
    this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
  }

  async postUserHandler(req, res, next) {
    try {
      // 1. Validasi input
      this._validator.validateUserPayload(req.body);

      // 2. Simpan ke database melalui service
      const userId = await this._service.addUser(req.body);

      // 3. Respon sukses (201 Created)
      res.status(201).json({
        status: 'success',
        message: 'User berhasil ditambahkan',
        data: { id: userId },
      });
    } catch (error) {
      // Lempar ke Error Middleware
      next(error);
    }
  }

  async getUserByIdHandler(req, res, next) {
    try {
      const { id } = req.params;

      const user = await this._service.getUserById(id);

      res.status(200).json({
        status: 'success',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UsersHandler;