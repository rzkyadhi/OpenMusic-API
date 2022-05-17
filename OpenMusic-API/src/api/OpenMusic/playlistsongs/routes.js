const Joi = require('joi');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists/{id}/songs',
    handler: handler.postPlaylistSongHandler,
    options: {
      auth: 'playlistapp_jwt',
      description: 'Post a song to a playlist in database',
      notes: 'Need a token to access this route and the playlist ID passed on the path',
      plugins: {
        'hapi-swagger': {
          responses: {
            201: {
              description: 'Lagu berhasil ditambahkan ke playlist',
            },
          },
        },
      },
      validate: {
        headers: Joi.object({
          authorization: Joi.string()
            .required()
            .description('bearer token'),
        }).unknown(),
        params: Joi.object({
          id: Joi.string()
            .max(50)
            .required()
            .description('the id for the playlist'),
        }),
        payload: Joi.object({
          songId: Joi.string().required(),
        }),
      },
      tags: ['api'],
    },
  },
  {
    method: 'GET',
    path: '/playlists/{id}/songs',
    handler: handler.getPlaylistSongsHandler,
    options: {
      auth: 'playlistapp_jwt',
      description: 'Get a song in a playlist by an playlist ID',
      notes: 'Need a token to access this route and the playlist ID passed on the path',
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Berhasil mengambil lagu dari playlist',
            },
          },
        },
      },
      validate: {
        headers: Joi.object({
          authorization: Joi.string()
            .required()
            .description('bearer token'),
        }).unknown(),
        params: Joi.object({
          id: Joi.string()
            .max(50)
            .required()
            .description('the id for the playlist'),
        }),
      },
      tags: ['api'],
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}/songs',
    handler: handler.deletePlaylistSongHandler,
    options: {
      auth: 'playlistapp_jwt',
      description: 'Delete a song in a playlist',
      notes: 'Need a token to access this route and the playlist ID passed on the path',
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Berhasil menghapus lagu dari playlist',
            },
          },
        },
      },
      validate: {
        headers: Joi.object({
          authorization: Joi.string()
            .required()
            .description('bearer token'),
        }),
        params: Joi.object({
          id: Joi.string()
            .max(50)
            .required()
            .description('the id for the playlist'),
        }),
      },
      tags: ['api'],
    },
  },
  {
    method: 'GET',
    path: '/playlists/{id}/activities',
    handler: handler.getPlaylistSongActivitiesHandler,
    options: {
      auth: 'playlistapp_jwt',
      description: 'Get playlist song activities by an playlist ID',
      notes: 'Need a token to access this route and the playlist ID passed on the path',
    },
  },
];

module.exports = routes;
