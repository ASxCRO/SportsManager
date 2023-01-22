import 'reflect-metadata';
import express, { Express } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import 'reflect-metadata';
import authRouter from './routers/AuthRouter';
import sportsRouter from './routers/SportsRouter';
import userRouter from './routers/UserRouter';
// import adminRouter from './routers/AdminRoutes';
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
app.use('/api/auth', authRouter);
app.use('/api/sports', sportsRouter);
app.use('/api/users', userRouter);
// app.use('/api/admin', adminRouter);

app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});
