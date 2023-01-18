import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import 'reflect-metadata';
import authRouter from './routers/AuthRoutes';
import sportsRouter from './routers/SportsRoutes';
import 'reflect-metadata';
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

app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});
