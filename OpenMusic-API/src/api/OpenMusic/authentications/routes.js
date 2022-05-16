const routes = (handler) => [
  {
    method: 'POST',
    path: '/authentications',
    handler: handler.postAuthenticationHandler,
    options: {
      description: 'Post an authentication',
      notes: 'Post an authentication to database',
      tags: ['api'],
    },
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: handler.putAuthenticationHandler,
    options: {
      description: 'Edit an authentication',
      notes: 'Edit an authentication from database',
      tags: ['api'],
    },
  },
  {
    method: 'DELETE',
    path: '/authentications',
    handler: handler.deleteAuthenticationHandler,
    options: {
      description: 'Delete an authentication',
      notes: 'Delete an authentication from database',
      tags: ['api'],
    },
  },
];

module.exports = routes;
