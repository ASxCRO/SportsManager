import { Repository } from 'typeorm';
import { AppDataSource } from '../data/data-source';
import { Class } from '../data/entity/Class';
import { ClassAppointment } from '../data/entity/ClassAppointment';
import { Sport } from '../data/entity/Sport';
import { User } from '../data/entity/User';
import { AgeGroup } from '../Enums/AgeGroup';

export default class SportsService {
  constructor(
    private sportRepository: Repository<Sport>,
    private classRepository: Repository<Class>,
    private userRepository: Repository<User>,
    private classAppointmentRepository: Repository<ClassAppointment>
  ) {}

  public async getAll(data: any) {
    return this.sportRepository.find();
  }

  public async getClasses(data: any) {
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

  public async getDetailsOfClass(data: any) {
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

  public async enrollToClass(data: any) {
    try {
      const users = await this.userRepository.find({
        relations: {
          classes: true,
        },
      });

      const user = users.filter((e) => e.id === data.userId)[0];

      const alreadyEnrolled = user.classAppointments.filter(
        (e) => e.id === data.classAppointmentId
      );

      if (alreadyEnrolled.length > 0) {
        return {
          message: 'User already applied to this class',
          status: 404,
          data: {},
        };
      }

      if (user.classes.length < 2) {
        const classs = await this.classRepository.findOneBy({
          id: data.classId,
        });

        user.classes.push(classs);
        const newUser = await AppDataSource.manager.save(user);

        return {
          message: 'User enrolled to class!',
          status: 200,
          data: newUser,
        };
      } else {
        return {
          message: 'User cant apply to more than 2 classes',
          status: 404,
          data: {},
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async enrollToClassAppointment(data: any) {
    const users = await this.userRepository.find({
      relations: {
        classAppointments: true,
      },
    });

    const user = users.filter((e) => e.id === data.userId)[0];

    const alreadyEnrolled = user.classAppointments.filter(
      (e) => e.id === data.classAppointmentId
    );

    if (alreadyEnrolled.length > 0) {
      return {
        message: 'User already applied to this appointment',
        status: 404,
        data: {},
      };
    }

    const usersCountOnAppointment = user.classAppointments.length;

    if (usersCountOnAppointment < 10) {
      const classAppointment = await this.classAppointmentRepository.findOneBy({
        id: data.classAppointmentId,
      });

      user.classAppointments.push(classAppointment);
      const newUser = await AppDataSource.manager.save(user);
      return {
        message: 'Enrolled',
        status: 200,
        data: newUser,
      };
    } else {
      return {
        message: 'User cant apply to more than 10 class appointments',
        status: 404,
        data: {},
      };
    }
  }

  public async unrollClass(data: any) {
    const users = await this.userRepository.find({
      relations: {
        classes: true,
      },
    });

    const user = users.filter((e) => e.id === data.userId)[0];

    const isEnrolled = user.classes.filter((e) => e.id === data.classId);

    if (isEnrolled.length < 1) {
      return {
        message: 'User not even applied to this class',
        status: 404,
        data: {},
      };
    }

    user.classes = user.classes.filter((classs) => {
      return classs.id !== data.classId;
    });

    const newUser = await AppDataSource.manager.save(user);

    return {
      message: 'Enrolled',
      status: 200,
      data: newUser,
    };
  }

  public async unrollClassAppointment(data: any) {
    const users = await this.userRepository.find({
      relations: {
        classAppointments: true,
      },
    });

    const user = users.filter((e) => e.id === data.userId)[0];

    const isEnrolled = user.classAppointments.filter(
      (e) => e.id === data.classAppointmentId
    );

    if (isEnrolled.length < 1) {
      return {
        message: 'User not even applied to this appointment',
        status: 404,
        data: {},
      };
    }

    user.classAppointments = user.classAppointments.filter(
      (classApointment) => {
        return classApointment.id !== data.classAppointmentId;
      }
    );

    const newUser = await AppDataSource.manager.save(user);

    return {
      message: 'Enrolled',
      status: 200,
      data: newUser,
    };
  }
}
