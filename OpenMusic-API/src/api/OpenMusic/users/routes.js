const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
    options: {
      description: 'Post an user',
      notes: 'Post an user to database',
      tags: ['api'],
    },
  },
];

module.exports = routes;
