const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class PlaylistSongsService {
  constructor() {
    this._pool = new Pool();
  }

  async addPlaylistSong({ songId, playlistId }) {
    const id = `playlistsongs-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO playlistsongs VALUES($1, $2, $3) RETURNING id',
      values: [id, playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new NotFoundError('Lagu gagal ditambahkan ke playlist');
    }

    return result.rows[0].id;
  }

  async getPlaylistSongs(playlistId) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer FROM songs
      JOIN playlistsongs ON songs.id = playlistsongs.song_id 
      WHERE playlistsongs.playlist_id = $1`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async getPlaylistById(id) {
    const query = {
      text: `SELECT playlists.id, playlists.name, users.username FROM playlists
      LEFT JOIN users ON users.id = playlists.owner
      WHERE playlists.id = $1`,
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }

    return result.rows[0];
  }

  async deletePlaylistSongsById(songId) {
    const query = {
      text: 'DELETE FROM playlistsongs WHERE song_id = $1 RETURNING id',
      values: [songId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Lagu gagal dihapus dari playlist. Id tidak ditemukan');
    }
  }

  async verifySongId(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }
  }

  async addPlaylistSongActivities(playlistId, songId, userId, action) {
    const id = `playlistsongactivities-${nanoid(16)}`;
    const time = new Date().toISOString();

    const query = {
      text: 'INSERT INTO playlistsongactivities VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, playlistId, songId, userId, action, time],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new InvariantError('Aktivitas lagu gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getPlaylistSongActivities(playlistId) {
    const query = {
      text: `SELECT users.username, songs.title, playlistsongactivities.action, playlistsongactivities.time
      FROM playlistsongactivities
      RIGHT JOIN users ON users.id = playlistsongactivities.user_id
      RIGHT JOIN songs ON songs.id = playlistsongactivities.song_id
      WHERE playlistsongactivities.playlist_id = $1`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = PlaylistSongsService;
