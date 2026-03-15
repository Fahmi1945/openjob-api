exports.up = (pgm) => {
  pgm.createTable('users', {
    id: { type: 'VARCHAR(50)', primaryKey: true },
    name: { type: 'VARCHAR(100)', notNull: true },
    email: { type: 'VARCHAR(100)', notNull: true, unique: true },
    password: { type: 'TEXT', notNull: true },
    role: { type: 'VARCHAR(50)', notNull: true, default: 'user' },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};