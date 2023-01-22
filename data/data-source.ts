import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Class } from './entity/Class';
import { ClassAppointment } from './entity/ClassAppointment';
import { Review } from './entity/Review';
import { Sport } from './entity/Sport';
import { User } from './entity/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Sport, Class, ClassAppointment, Review],
  migrations: [],
  subscribers: [],
});
