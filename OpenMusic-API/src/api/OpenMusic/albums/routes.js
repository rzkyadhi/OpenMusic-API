const Joi = require('joi');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums',
    handler: handler.postAlbumHandler,
    options: {
      description: 'Post an album',
      notes: 'Post an album to database',
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
      tags: ['api'],
      validate: {
        params: Joi.object({
          id: Joi.string()
            .max(50)
            .required()
            .description('the id for the album'),
        }),
      },
    },
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: handler.putAlbumByIdHandler,
    options: {
      description: 'Edit album by an ID',
      notes: 'Edit album details by an ID from database',
      tags: ['api'],
      validate: {
        params: Joi.object({
          id: Joi.string()
            .max(50)
            .required()
            .description('the id for the album'),
        }),
      },
    },
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: handler.deleteAlbumByIdHandler,
    options: {
      description: 'delete album by an ID',
      notes: 'Delete album by an ID from database',
      tags: ['api'],
      validate: {
        params: Joi.object({
          id: Joi.string()
            .max(50)
            .required()
            .description('the id for the album'),
        }),
      },
    },
  },
];

module.exports = routes;
