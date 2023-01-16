import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/UserRouter';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const port = process.env.PORT;
const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('HELLO FROM EXPRESS + TS!!!!');
});

app.get('/hi', (req: Request, res: Response) => {
  res.send('BYEEE!!');
});

app.use('/users', userRouter);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SportsManager Express API with Swagger',
      version: '0.1.0',
      description: 'Crud Api documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'SportManager',
        url: 'https://antoniosupan.netlify.app/',
        email: 'antonio.suups@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['dist/routes/*.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});
