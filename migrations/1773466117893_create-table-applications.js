exports.up = (pgm) => {
  pgm.createTable('applications', {
    id: { type: 'VARCHAR(50)', primaryKey: true },
    user_id: { type: 'VARCHAR(50)', references: '"users"', onDelete: 'CASCADE' },
    job_id: { type: 'VARCHAR(50)', references: '"jobs"', onDelete: 'CASCADE' },
    status: { type: 'VARCHAR(20)', notNull: true, default: 'pending' }, // e.g., pending, accepted, rejected
    created_at: { type: 'TIMESTAMP', notNull: true, default: pgm.func('current_timestamp') },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('applications');
};