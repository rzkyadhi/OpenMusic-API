const Joi = require('joi');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/collaborations',
    handler: handler.postCollaborationHandler,
    options: {
      auth: 'playlistapp_jwt',
      description: 'Post a collaborations to database',
      notes: 'Need a token to access this route, also playlistId and userId in the payload',
      validate: {
        headers: Joi.object({
          authorization: Joi.string()
            .required()
            .description('Bearer Token Type'),
        }).unknown(),
        payload: Joi.object({
          playlistId: Joi.string().required(),
          userId: Joi.string().required(),
        }),
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            201: {
              description: 'Created',
              schema: Joi.object({
                status: Joi.string().default('success'),
                message: Joi.string().default('Kolaborasi berhasil ditambahkan'),
                data: Joi.object({
                  collaborationId: Joi.string().default('collab-pgXBCjxepsCxrMif'),
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
    method: 'DELETE',
    path: '/collaborations',
    handler: handler.deleteCollaborationHandler,
    options: {
      auth: 'playlistapp_jwt',
      description: 'Delete a collaboration',
      notes: 'Need a token to access this route, also playlistId and userId in the payload',
      validate: {
        headers: Joi.object({
          authorization: Joi.string()
            .required()
            .description('Bearer Token Type'),
        }),
        payload: Joi.object({
          playlistId: Joi.string().required(),
          userId: Joi.string().required(),
        }),
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'OK',
              schema: Joi.object({
                status: Joi.string().default('success'),
                message: Joi.string().default('Kolaborasi berhasil dihapus'),
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
