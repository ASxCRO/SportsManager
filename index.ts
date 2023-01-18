import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import 'reflect-metadata';
import authRouter from './routers/AuthRoutes';
import sportsRouter from './routers/SportsRoutes';
import 'reflect-metadata';
import { AppDataSource } from './data/data-source';
import { Sport } from './data/entity/Sport';
import { Class } from './data/entity/Class';
import { AgeGroup } from './Enums/AgeGroup';

dotenv.config();
const port = process.env.PORT;
const app: Express = express();

AppDataSource.initialize()
  .then(async () => {
    console.log('db connected ');
    // let classRepo = AppDataSource.getRepository(Class);
    // const sports = await AppDataSource.manager.find(Sport);

    // sports.forEach((sport) => {
    //   Object.values(AgeGroup).forEach((ageGroup) => {
    //     const sportsClass = new Class();
    //     sportsClass.sport = sport;
    //     sportsClass.ageGroup = ageGroup;
    //     sportsClass.description =
    //       "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged";
    //     sportsClass.duration = '01:15h';

    //     classRepo.save(sportsClass);
    //   });
    // });
    // console.log('insert finished');
  })
  .catch((error) => console.log(error));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/auth', authRouter);
app.use('/api/sports', sportsRouter);

app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});
