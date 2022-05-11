const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylists(userId) {
    const query = {
      text: `SELECT playlists.id, playlists.name FROM playlists
             LEFT JOIN collaborations ON collaborations.playlist_id = playlists.id
             WHERE playlists.owner = $1 OR collaborations.user_id = $1
             GROUP BY playlists.id`,
      values: [userId],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async getPlaylistSongs(playlistId) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer FROM songs
      LEFT JOIN playlistsongs ON playlistsongs.song_id = songs.id
      WHERE playlistsongs.playlist_id = $1`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = PlaylistsService;
