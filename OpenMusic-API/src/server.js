require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const path = require('path');
const ClientError = require('./exceptions/ClientError');

// Albums
const albums = require('./api/OpenMusic/albums');
const AlbumsService = require('./services/postgres/AlbumsService');
const AlbumsValidator = require('./validator/albums');

// Songs
const songs = require('./api/OpenMusic/songs');
const SongsService = require('./services/postgres/SongsService');
const SongsValidator = require('./validator/songs');

// Users
const users = require('./api/OpenMusic/users');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');

// Authentications
const authentications = require('./api/OpenMusic/authentications');
const AuthenticationsService = require('./services/postgres/AuthenticationsService');
const TokenManager = require('./tokenize/TokenManager');
const AuthenticationsValidator = require('./validator/authentications');

// Playlists
const playlists = require('./api/OpenMusic/playlists');
const PlaylistsService = require('./services/postgres/PlaylistsService');
const PlaylistsValidator = require('./validator/playlists');

// PlaylistSongs
const playlistSongs = require('./api/OpenMusic/playlistsongs');
const PlaylistSongsService = require('./services/postgres/PlaylistSongsService');
const PlaylistSongsValidator = require('./validator/playlistsongs');

// Collaborations
const collaborations = require('./api/OpenMusic/collaborations');
const CollaborationsService = require('./services/postgres/CollaborationsService');
const CollaborationsValidator = require('./validator/collaborations');

// Exports
const _exports = require('./api/OpenMusic/exports');
const ProducerService = require('./services/rabbitmq/ProducerService');
const ExportsValidator = require('./validator/exports');

// Uploads
const uploads = require('./api/OpenMusic/uploads');
const StorageService = require('./services/storage/StorageService');
const UploadsValidator = require('./validator/uploads');

// UserAlbumLikes
const userAlbumLikes = require('./api/OpenMusic/useralbumlikes');
const UserAlbumLikesService = require('./services/postgres/UserAlbumLikesService');

// Cache
const CacheService = require('./services/redis/CacheService');

const init = async () => {
  const cacheService = new CacheService();
  const collaborationsService = new CollaborationsService();
  const albumsService = new AlbumsService();
  const songsService = new SongsService();
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();
  const playlistsService = new PlaylistsService(collaborationsService);
  const playlistSongsService = new PlaylistSongsService();
  const storageService = new StorageService(path.resolve(__dirname, 'api/OpenMusic/uploads/file/images'));
  const userAlbumLikesService = new UserAlbumLikesService(cacheService);

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  const swaggerOptions = {
    info: {
      title: 'Openmusic API Documentation',
    },
  };

  await server.register([
    {
      plugin: Jwt,
    },
    {
      plugin: Inert,
    },
    {
      plugin: Vision,
    },
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  server.auth.strategy('playlistapp_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  await server.register([
    {
      plugin: albums,
      options: {
        service: albumsService,
        validator: AlbumsValidator,
      },
    },
    {
      plugin: songs,
      options: {
        service: songsService,
        validator: SongsValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
    {
      plugin: playlists,
      options: {
        service: playlistsService,
        validator: PlaylistsValidator,
      },
    },
    {
      plugin: playlistSongs,
      options: {
        playlistsService,
        playlistSongsService,
        validator: PlaylistSongsValidator,
      },
    },
    {
      plugin: collaborations,
      options: {
        collaborationsService,
        playlistsService,
        validator: CollaborationsValidator,
      },
    },
    {
      plugin: _exports,
      options: {
        producerService: ProducerService,
        playlistsService,
        validator: ExportsValidator,
      },
    },
    {
      plugin: uploads,
      options: {
        storageService,
        albumsService,
        validator: UploadsValidator,
      },
    },
    {
      plugin: userAlbumLikes,
      options: {
        service: userAlbumLikesService,
      },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    return response.continue || response;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
