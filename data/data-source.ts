import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import verifiedUser from './migration/1673993063306-newVerifiedPropOnUser';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'manager_postgres',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'sportsmanager',
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [verifiedUser],
  subscribers: [],
});
