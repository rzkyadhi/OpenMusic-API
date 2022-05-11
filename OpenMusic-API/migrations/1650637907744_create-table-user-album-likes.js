/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('useralbumlikes', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    user_id: {
      type: 'VARCHAR(25)',
      notNull: true,
    },
    album_id: {
      type: 'VARCHAR(25)',
      notNull: true,
    },
  });
  pgm.addConstraint('useralbumlikes', 'unique_user_id_and_album_id', 'UNIQUE(user_id, album_id)');
  pgm.addConstraint('useralbumlikes', 'fk_useralbumlikes.user_id_users.id', 'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE');
  pgm.addConstraint('useralbumlikes', 'fk_useralbumlikes.album_id_albums.id', 'FOREIGN KEY(album_id) REFERENCES albums(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint('useralbumlikes', 'unique_user_id_and_album_id');
  pgm.dropConstraint('useralbumlikes', 'fk_useralbumlikes.user_id_users.id');
  pgm.dropConstraint('useralbumlikes', 'fk_useralbumlikes.album_id_albums.id');
  pgm.dropTable('useralbumlikes');
};
