const PlaylistSongsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlistsongs',
  version: '1.0.0',
  register: async (server, { playlistsService, playlistSongsService, validator }) => {
    const playlistSongsHandler = new PlaylistSongsHandler(
      playlistsService,
      playlistSongsService,
      validator,
    );
    server.route(routes(playlistSongsHandler));
  },
};
