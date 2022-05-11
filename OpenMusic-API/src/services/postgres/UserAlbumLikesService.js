const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class UserAlbumLikesService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
  }

  async addUserAlbumLikes(userId, albumId) {
    const id = `useralbumlikes-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO useralbumlikes VALUES($1, $2, $3) RETURNING id',
      values: [id, userId, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('UserAlbumLikes gagal ditambahkan');
    }

    await this._cacheService.delete(`useralbumlikes:${albumId}`);

    return result.rows[0].id;
  }

  async getUserAlbumLikes(albumId) {
    try {
      const result = await this._cacheService.get(`useralbumlikes:${albumId}`);
      return {
        total: JSON.parse(result),
        source: 'cache',
      };
    } catch (error) {
      const query = {
        text: 'SELECT * FROM useralbumlikes WHERE album_id = $1',
        values: [albumId],
      };

      const result = await this._pool.query(query);

      if (!result.rowCount) {
        throw new NotFoundError('UserAlbumLikes tidak ditemukan');
      }

      await this._cacheService.set(`useralbumlikes:${albumId}`, JSON.stringify(result.rowCount));

      return {
        total: result.rowCount,
        source: 'database',
      };
    }
  }

  async deleteUserAlbumLikes(userId, albumId) {
    const query = {
      text: 'DELETE FROM useralbumlikes WHERE user_id = $1 AND album_id = $2 RETURNING id',
      values: [userId, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal melakukan dislike. UserAlbumLikes tidak ditemukan');
    }

    await this._cacheService.delete(`useralbumlikes:${albumId}`);
  }

  async checkUserAlbumLikesStatus(userId, albumId) {
    const query = {
      text: 'SELECT * FROM useralbumlikes WHERE user_id = $1 AND album_id = $2',
      values: [userId, albumId],
    };

    const result = await this._pool.query(query);

    return result.rowCount;
  }

  async checkAlbumById(albumId) {
    const query = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Album tidak ditemukan');
    }
  }
}

module.exports = UserAlbumLikesService;
