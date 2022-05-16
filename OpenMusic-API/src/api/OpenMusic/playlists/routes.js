const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists',
    handler: handler.postPlaylistHandler,
    options: {
      auth: 'playlistapp_jwt',
      description: 'Post a playlist',
      notes: 'Post a playlist to database',
      tags: ['api'],
    },
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: handler.getPlaylistsHandler,
    options: {
      auth: 'playlistapp_jwt',
      description: 'Get all playlists',
      notes: 'Returns all playlists in the database',
      tags: ['api'],
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}',
    handler: handler.deletePlaylistByIdHandler,
    options: {
      auth: 'playlistapp_jwt',
      description: 'Delete a playlist by an ID',
      notes: 'Delete playlist by an ID from database',
      tags: ['api'],
    },
  },
];

module.exports = routes;
