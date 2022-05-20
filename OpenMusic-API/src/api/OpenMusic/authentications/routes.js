const Joi = require('joi');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/authentications',
    handler: handler.postAuthenticationHandler,
    options: {
      description: 'Post an authentication',
      notes: 'Post an authentication to database',
      plugins: {
        'hapi-swagger': {
          validate: {
            payload: Joi.object({
              username: Joi.string().required().default('john'),
              password: Joi.string().required().default('secret'),
            }),
          },
          responses: {
            201: {
              description: 'Created',
              schema: Joi.object({
                status: 'success',
                message: 'Authentication berhasil ditambahkan',
                data: {
                  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItTllNWWtNaHNwTWpveEtqZCIsImlhdCI6MTY1MzAxMDIwMX0.GQaVmeENTlt2xxs5dpmeSGJmD_Fs1mTSodizBfPW5pc',
                  refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItTllNWWtNaHNwTWpveEtqZCIsImlhdCI6MTY1MzAxMDIwMX0.zvTOpd0jtJx1AC4bfD9qH_Md18bc_9FTIWnzMrhGkwo',
                },
              }),
            },
          },
        },
      },
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
      plugins: {
        'hapi-swagger': {
          validate: {
            payload: Joi.object({
              refreshToken: Joi.string().required().default('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItTllNWWtNaHNwTWpveEtqZCIsImlhdCI6MTY1MzAxMDIwMX0.zvTOpd0jtJx1AC4bfD9qH_Md18bc_9FTIWnzMrhGkwo'),
            }),
          },
          responses: {
            200: {
              description: 'OK',
              schema: Joi.object({
                status: 'success',
                message: 'Access token berhasil diperbarui',
                data: {
                  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItTllNWWtNaHNwTWpveEtqZCIsImlhdCI6MTY1MzAxMDU0Mn0.KeWw-jQGTWZp_dgUItVgB3Yz-IOWqn3s1I6w2vCgExg',
                },
              }),
            },
          },
        },
      },
    },
  },
  {
    method: 'DELETE',
    path: '/authentications',
    handler: handler.deleteAuthenticationHandler,
    options: {
      description: 'Delete an authentication',
      notes: 'Delete an authentication from database',
      plugins: {
        'hapi-swagger': {
          validate: {
            payload: Joi.object({
              refreshToken: Joi.string().required().default('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItTllNWWtNaHNwTWpveEtqZCIsImlhdCI6MTY1MzAxMDIwMX0.zvTOpd0jtJx1AC4bfD9qH_Md18bc_9FTIWnzMrhGkwo'),
            }),
          },
          responses: {
            200: {
              description: 'OK',
              schema: Joi.object({
                status: 'message',
                message: 'Refresh token berhasil dihapus',
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
