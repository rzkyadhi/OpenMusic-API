exports.up = (pgm) => {
  pgm.addConstraint('songs', 'fk_songs.albumId_albums.id', 'FOREIGN KEY("albumId") references albums(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint('songs', 'fk_songs.albumId_albums.id');
};
