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

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/sports', sportsRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/class', classRouter);
app.use('/api/v1/classAppointment', classAppointmentRouter);
app.use('/api/v1/review', reviewRouter);

app.use('/documentation', swaggerUi.serve, swaggerUi.setup(apiDocumentation));

app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});
