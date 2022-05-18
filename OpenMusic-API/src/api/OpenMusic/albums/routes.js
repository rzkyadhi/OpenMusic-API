const Joi = require('joi');

const currentYear = new Date().getFullYear();

const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums',
    handler: handler.postAlbumHandler,
    options: {
      description: 'Post an album',
      notes: 'Post an album to database',
      plugins: {
        'hapi-swagger': {
          validate: {
            payload: {
              name: Joi.string().max(50).required().default('Viva la vida'),
              year: Joi.number().min(1900).max(currentYear).required(),
            },
          },
          responses: {
            201: {
              description: 'Created',
              schema: Joi.object({
                status: 'success',
                data: {
                  albumId: 'album-hWvvhsb8BLd5_vPQ',
                },
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
    path: '/albums/{id}',
    handler: handler.getAlbumByIdHandler,
    options: {
      description: 'Get an album by an ID',
      notes: 'Returns an album by the ID passed in the path',
      plugins: {
        'hapi-swagger': {
          validate: {
            params: Joi.object({
              id: Joi.string()
                .max(50)
                .required()
                .description('the id for the album'),
            }),
          },
          responses: {
            200: {
              description: 'OK',
              schema: Joi.object({
                status: 'success',
                data: {
                  album: {
                    id: 'album-hWvvhsb8BLd5_vPQ',
                    name: 'Viva la vida',
                    year: 2008,
                    coverUrl: null,
                    songs: Joi.array().default([]),
                  },
                },
              }),
            },
          },
        },
      },
      tags: ['api'],
    },
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: handler.putAlbumByIdHandler,
    options: {
      description: 'Edit album by an ID',
      notes: 'Edit album details by an ID from database',
      plugins: {
        'hapi-swagger': {
          validate: {
            params: Joi.object({
              id: Joi.string()
                .max(50)
                .required()
                .description('the id for the album'),
            }),
            payload: Joi.object({
              name: Joi.string().max(50).required().default('Viva la vida revision'),
              year: Joi.number().min(1900).max(currentYear).required(),
            }),
          },
          responses: {
            200: {
              description: 'OK',
              schema: Joi.object({
                status: 'success',
                message: 'Album berhasil diperbarui',
              }),
            },
          },
        },
      },
      tags: ['api'],
    },
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: handler.deleteAlbumByIdHandler,
    options: {
      description: 'delete album by an ID',
      notes: 'Delete album by an ID from database',
      plugins: {
        'hapi-swagger': {
          validate: {
            params: Joi.object({
              id: Joi.string()
                .max(50)
                .required()
                .description('the id for the album'),
            }),
          },
          responses: {
            200: {
              description: 'OK',
              schema: Joi.object({
                status: 'success',
                message: 'Album berhasil dihapus',
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
