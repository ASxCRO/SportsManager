import dotenv from 'dotenv';
import { AppDataSource } from '../data/data-source';
import { User } from '../data/entity/User';

dotenv.config();

export default class UserService {
  public static userRepository = AppDataSource.getRepository(User);

  public static async all() {
    return await this.userRepository.find();
  }

  public static async findById(data: any) {
    return await this.userRepository.findBy({ id: data.id });
  }

  public static async update(data: any) {}

  public static async delete(id: number) {}
}
