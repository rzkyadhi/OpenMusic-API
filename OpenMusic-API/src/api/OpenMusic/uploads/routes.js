const Joi = require('joi');
const path = require('path');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums/{id}/covers',
    handler: handler.postUploadAlbumCoverHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 512000,
      },
      description: 'Post an album cover',
      notes: 'Need an images with max 0.512 mb',
      plugins: {
        'hapi-swagger': {
          payloadType: 'multipart/form-data',
          validate: {
            params: Joi.object({
              id: Joi.string()
                .max(50)
                .required()
                .description('the id for the album'),
            }),
            payload: Joi.object({
              file: Joi.any()
                .meta({ swaggerType: 'file' })
                .required()
                .description('image file'),
            }),
          },
          responses: {
            201: {
              description: 'Created',
              content: 'multipart/form-data',
              schema: Joi.object({
                status: Joi.string().default('success'),
                message: Joi.string().default('Sampul berhasil diunggah'),
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
    path: '/albums/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, 'file'),
      },
    },
  },
];

module.exports = routes;
