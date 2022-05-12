const Joi = require('joi');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/songs',
    handler: handler.postSongHandler,
    options: {
      description: 'Post a song',
      notes: 'Post a song to database',
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
      validate: {
        params: Joi.object({
          id: Joi.string()
            .max(50)
            .required()
            .description('the id for the song'),
        }),
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
      validate: {
        params: Joi.object({
          id: Joi.string()
            .max(50)
            .required()
            .description('the id for the song'),
        }),
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
      tags: ['api'],
      validate: {
        params: Joi.object({
          id: Joi.string()
            .max(50)
            .required()
            .description('the id for the song'),
        }),
      },
    },
  },
];

module.exports = routes;
