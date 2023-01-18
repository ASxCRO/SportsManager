import { AppDataSource } from '../data/data-source';
import { Class } from '../data/entity/Class';
import { ClassAppointment } from '../data/entity/ClassAppointment';
import { Sport } from '../data/entity/Sport';
import { User } from '../data/entity/User';
import { AgeGroup } from '../Enums/AgeGroup';

export default class SportsService {
  public static sportRepository = AppDataSource.getRepository(Sport);
  public static classRepository = AppDataSource.getRepository(Class);
  public static userRepository = AppDataSource.getRepository(User);
  public static classAppointmentRepository =
    AppDataSource.getRepository(ClassAppointment);

  public static async getAll(data: any) {
    return this.sportRepository.find();
  }

  public static async getClasses(data: any) {
    let classes = AppDataSource.createQueryBuilder(Class, 'class')
      .leftJoinAndSelect('class.sport', 'sport')
      .leftJoinAndSelect('class.classAppointments', 'classAppointments');

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

  public static async getDetailsOfClass(data: any) {
    let classes = AppDataSource.createQueryBuilder(Class, 'class')
      .leftJoinAndSelect('class.sport', 'sport')
      .leftJoinAndSelect('class.classAppointments', 'classAppointments');

    if (data.id) {
      classes.where('class.id = :id', {
        id: data.id,
      });
    }

    const filteredClasses = await classes.getMany();

    return filteredClasses;
  }

  public static async enrollToClass(data: any) {
    try {
      const userWithClasses = await AppDataSource.getRepository(User)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.classes', 'classes')
        .andWhere('user.id = :id', {
          id: data.userId,
        })
        .getOne();

      if (userWithClasses.classes.length < 2) {
        const users = await this.userRepository.find({
          relations: {
            classes: true,
          },
        });

        const user = users.filter((e) => e.id === data.userId)[0];

        const classs = await this.classRepository.findOneBy({
          id: data.classId,
        });

        user.classes.push(classs);
        const newUser = await AppDataSource.manager.save(user);

        return {
          message: 'User enrolled to class!',
          status: 404,
          data: newUser,
        };
      }
    } catch (error) {
      console.log(error);
    }

    return {
      message: 'User cant apply to more than 2 classes',
      status: 404,
      data: {},
    };
  }

  public static async enrollToClassAppointment(data: any) {
    const users = await this.userRepository.find({
      relations: {
        classAppointments: true,
      },
    });

    const user = users.filter((e) => e.id === data.userId)[0];

    const usersCountOnAppointment = user.classAppointments.length;

    if (usersCountOnAppointment < 10) {
      const classAppointment = await this.classAppointmentRepository.findOneBy({
        id: data.classAppointmentId,
      });

      user.classAppointments.push(classAppointment);
      const newUser = await AppDataSource.manager.save(user);
      return newUser;
    }

    return 'User cant apply to more than 10 class appointments';
  }
}
