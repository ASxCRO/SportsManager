const register = {
  tags: ['Auth'],
  description: 'Register new user in the system',
  operationId: 'register',
  security: [
    {
      token: [],
    },
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/registerBody',
        },
      },
    },
    required: true,
  },
  responses: {
    '201': {
      description: 'Registered',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                example: '60564fcb544047cdc3844818',
              },
              name: {
                type: 'string',
                example: 'John Snow',
              },
              email: {
                type: 'string',
                example: 'john.snow@email.com',
              },
              password: {
                type: 'string',
                example: '442893aba778ab321dc151d9b1ad98c64ed56c07f8cbaed',
              },
            },
          },
        },
      },
    },
    '500': {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Internal Server Error',
              },
            },
          },
        },
      },
    },
  },
};
const registerBody = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      example: 'John Snow',
    },
    email: {
      type: 'string',
      example: 'john.snow@email.com',
    },
    password: {
      type: 'string',
      description: "unencrypted user's password",
      example: '!1234aWe1Ro3$#',
    },
  },
};

export { register, registerBody };
