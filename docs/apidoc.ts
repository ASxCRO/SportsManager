import { register, registerBody } from './auth/register';

const apiDocumentation = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'Sports API - Documentation',
    description: 'Description of Sports API',
    termsOfService: 'https://mysite.com/terms',
    contact: {
      name: 'Antonio Supan',
      email: 'antonio.suups@gmail.com',
      url: 'https://antoniosupan.netlify.app',
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  servers: [
    {
      url: 'http://localhost:3322/api/v1',
      description: 'Local Server',
    },
  ],
  tags: [
    {
      name: 'Auth',
    },
    {
      name: 'Sports',
    },
    {
      name: 'User',
    },
    {
      name: 'Class',
    },
    {
      name: 'ClassAppointments',
    },
    {
      name: 'Review',
    },
  ],
  paths: {
    '/auth/register': {
      post: register,
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      registerBody,
    },
  },
};

export { apiDocumentation };
