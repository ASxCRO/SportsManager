import { AppDataSource } from '../data/data-source';
import { Sport } from '../data/entity/Sport';

export default class SportsService {
  public static userRepository = AppDataSource.getRepository(Sport);
  public static async getAll(data: any) {
    return AppDataSource.manager.find(Sport);
  }
}
