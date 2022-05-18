const Joi = require('joi');

const currentTime = new Date().getTime();

const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
    options: {
      description: 'Post an user',
      notes: 'Post an user to database',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          validate: {
            payload: Joi.object({
              username: Joi.string().max(50).required().default(`dicoding_${currentTime}`),
              password: Joi.string().required().default('secret'),
              fullname: Joi.string().required().default('Dicoding Indonesia'),
            }),
          },
          responses: {
            201: {
              description: 'Created',
              schema: Joi.object({
                status: 'success',
                message: 'User berhasil ditambahkan',
                data: {
                  userId: 'user-lz1KPr2bf8PmEIsV',
                },
              }),
            },
          },
        },
      },
    },
  },
];

module.exports = routes;
