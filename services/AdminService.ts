import dotenv from 'dotenv';
import { AppDataSource } from '../data/data-source';
import { User } from '../data/entity/User';

dotenv.config();

export default class AdminService {
  public static userRepository = AppDataSource.getRepository(User);
  public static async register(data: any) {}

  public static async login(data: any) {}

  public static async verify(token: string) {}
}
