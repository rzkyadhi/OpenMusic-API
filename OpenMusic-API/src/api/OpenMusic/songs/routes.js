const Joi = require('joi');
// const SongPayloadSchema = require('../../../validator/songs/schema');
const currentYear = new Date().getFullYear();

const routes = (handler) => [
  {
    method: 'POST',
    path: '/songs',
    handler: handler.postSongHandler,
    options: {
      description: 'Post a song',
      notes: 'Post a song to database',
      plugins: {
        'hapi-swagger': {
          validate: {
            payload: Joi.object({
              title: Joi.string().max(50).required().default('Life in Technicolor'),
              year: Joi.number().integer().min(1900).max(currentYear)
                .required(),
              genre: Joi.string().max(50).required().default('Pop'),
              performer: Joi.string().max(50).required().default('Coldplay'),
              duration: Joi.number().integer().allow(null, '').default(120),
            }),
          },
          responses: {
            201: {
              description: 'Created',
              schema: Joi.object({
                status: 'success',
                data: Joi.object({
                  songId: 'song-DwvHcPeNcc_P-jlc',
                }),
              }),
            },
          },
        },
      },
      tags: ['api'],
    },
  },
  {
    method: 'GET',
    path: '/songs',
    handler: handler.getSongsHandler,
    options: {
      description: 'Get all songs',
      notes: 'Returns all songs in the database',
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'OK',
              schema: Joi.object({
                status: 'success',
                data: Joi.object({
                  songs: Joi.array().items(Joi.object({
                    id: 'song-rcuRVyWyCpRF7gNU',
                    title: 'Life in Technicolor',
                    performer: 'Coldplay',
                  })),
                }),
              }),
            },
          },
        },
      },
      tags: ['api'],
    },
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: handler.getSongByIdHandler,
    options: {
      description: 'Get a song by an ID',
      notes: 'Returns a song by the ID passed in the path',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          validate: {
            params: Joi.object({
              id: Joi.string()
                .max(50)
                .required()
                .description('the id for the song'),
            }),
          },
          responses: {
            200: {
              description: 'OK',
              schema: Joi.object({
                status: 'success',
                data: {
                  song: {
                    id: 'song-rcuRVyWyCpRF7gNU',
                    title: 'Life in Technicolor',
                    year: 2008,
                    genre: 'Pop',
                    performer: 'Coldplay',
                    duration: 120,
                    albumId: null,
                  },
                },
              }),
            },
          },
        },
      },
    },
  },
  {
    method: 'PUT',
    path: '/songs/{id}',
    handler: handler.putSongByIdHandler,
    options: {
      description: 'Edit song by an ID',
      notes: 'Edit song details by an ID from database',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          validate: {
            params: Joi.object({
              id: Joi.string()
                .max(50)
                .required()
                .description('the id for the song'),
            }),
            payload: Joi.object({
              title: Joi.string().max(50).required().default('Life in Technicolor revision'),
              year: Joi.number().integer().min(1900).max(currentYear)
                .required(),
              genre: Joi.string().max(50).required().default('Pop'),
              performer: Joi.string().max(50).required().default('Coldplay'),
              duration: Joi.number().integer().allow(null, '').default(120),
            }),
          },
          responses: {
            200: {
              description: 'OK',
              schema: Joi.object({
                status: 'success',
                message: 'Lagu berhasil diperbarui',
              }),
            },
          },
        },
      },
    },
  },
  {
    method: 'DELETE',
    path: '/songs/{id}',
    handler: handler.deleteSongByIdHandler,
    options: {
      description: 'delete song by an ID',
      notes: 'Delete song by an ID from database',
      plugins: {
        'hapi-swagger': {
          validate: {
            params: Joi.object({
              id: Joi.string()
                .max(50)
                .required()
                .description('the id for the song'),
            }),
          },
          responses: {
            200: {
              description: 'OK',
              schema: Joi.object({
                status: 'success',
                message: 'Lagu berhasil dihapus',
              }),
            },
          },
        },
      },
      tags: ['api'],
    },
  },
];

module.exports = routes;
