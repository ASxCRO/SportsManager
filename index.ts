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
import { ClassAppointment } from './data/entity/ClassAppointment';

dotenv.config();
const port = process.env.PORT;
const app: Express = express();

function addWeeks(date, weeks): Date {
  date.setDate(date.getDate() + 7 * weeks);

  return date;
}

AppDataSource.initialize()
  .then(async () => {
    console.log('db connected ');
    // let classRepo = AppDataSource.getRepository(ClassAppointment);
    // const classes = await AppDataSource.manager.find(Class);
    // let now = new Date();
    // classes.forEach((classs, index) => {
    //   for (let index = 0; index < 5; index++) {
    //     now.setDate(now.getDate() + 7 * index);
    //     const classAppointment = new ClassAppointment();
    //     classAppointment.classs = classs;
    //     classAppointment.dateStarting = now;
    //     classAppointment.description =
    //       "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged";

    //     classRepo.save(classAppointment);
    //   }
    // });
  })
  .catch((error) => console.log(error));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/auth', authRouter);
app.use('/api/sports', sportsRouter);

app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});
