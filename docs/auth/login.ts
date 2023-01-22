const login = {
  tags: ['Auth'],
  description: 'Login user in the system',
  operationId: 'login',
  security: [
    {
      token: [],
    },
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/loginBody',
        },
      },
    },
    required: true,
  },
  responses: {
    '200': {
      description: 'Logged in',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
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
    '401': {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Unauthorized',
              },
            },
          },
        },
      },
    },
  },
};
const loginBody = {
  type: 'object',
  properties: {
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

export { login, loginBody };
