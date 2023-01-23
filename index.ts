import 'reflect-metadata';
import express, { Express } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRouter from './routers/AuthRouter';
import sportsRouter from './routers/SportsRouter';
import userRouter from './routers/UserRouter';
import classRouter from './routers/ClassRouter';
import classAppointmentRouter from './routers/ClassAppointmentRouter';
import reviewRouter from './routers/ReviewRouter';
import swaggerUi from 'swagger-ui-express';
import { apiDocumentation } from './docs/apidoc';
import { AppDataSource } from './data/data-source';

import { Router } from 'express';
import RouteGroup from 'express-route-grouping';

dotenv.config();
const port = process.env.PORT;
const app: Express = express();

AppDataSource.initialize()
  .then(async () => {
    console.log('db connected ');
  })
  .catch((error) => console.log(error));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const root = new RouteGroup('/', Router());

//v1 routes
root.group('/api', (api) => {
  api.group('/v1', (v1) => {
    v1.use('/auth', authRouter);
    v1.use('/sports', sportsRouter);
    v1.use('/users', userRouter);
    v1.use('/class', classRouter);
    v1.use('/classAppointment', classAppointmentRouter);
    v1.use('/review', reviewRouter);
  });
});

app.use('/', root.export());
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(apiDocumentation));

app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});
