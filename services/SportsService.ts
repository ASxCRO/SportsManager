import { AppDataSource } from '../data/data-source';
import { Class } from '../data/entity/Class';
import { Sport } from '../data/entity/Sport';
import { AgeGroup } from '../Enums/AgeGroup';

export default class SportsService {
  public static sportRepository = AppDataSource.getRepository(Sport);
  public static classRepository = AppDataSource.getRepository(Class);

  public static async getAll(data: any) {
    return this.sportRepository.find;
  }

  public static async getClasses(data: any) {
    let classes = AppDataSource.createQueryBuilder(
      Class,
      'class'
    ).leftJoinAndSelect('class.sport', 'sport');

    let sports = await this.sportRepository.find();

    if (data.sports) {
      const sportsFromParams: string[] = data.sports.split(',');

      classes.where('sport.name IN (:...sports)', {
        sports: sportsFromParams,
      });
    }

    if (data.ageGroup) {
      const ageGroup: AgeGroup = data.ageGroup;
      classes.andWhere('class.ageGroup = :ageGroup', {
        ageGroup: ageGroup,
      });
    }

    const filteredClasses = await classes.getMany();

    return filteredClasses;
  }
}
