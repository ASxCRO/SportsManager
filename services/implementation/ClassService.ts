import { Repository } from 'typeorm';
import { AppDataSource } from '../../data/data-source';
import { Class } from '../../data/entity/Class';
import HttpStatusCode from '../../enums/HttpStatusCode';
import { IClassCreateRequest } from '../../HttpModels/requestModels/Class/IClassCreateRequest';
import { IClassUpdateRequest } from '../../HttpModels/requestModels/Class/IClassUpdateRequest';
import { IHttpResponse } from '../../HttpModels/responseModels/IHttpResponse';
import { IClassService } from '../declaration/IClassService';
import { SportsService } from './SportsService';
import { UserService } from './UserService';

export class ClassService implements IClassService {
  private classRepository: Repository<Class>;
  private sportsService: SportsService;
  private userService: UserService;

  constructor() {
    this.sportsService = new SportsService();
    this.classRepository = AppDataSource.getRepository(Class);
  }

  public async all() {
    const allClasses = await this.classRepository.find({
      relations: {
        classAppointments: true,
      },
    });

    let response: IHttpResponse<Class[]>;
    if (allClasses.length > 0) {
      response = {
        data: allClasses,
        status: HttpStatusCode.OK,
        isError: false,
        message: '',
      };
    } else {
      response = {
        status: HttpStatusCode.NOT_FOUND,
        isError: true,
        message: 'Problem with loading all classes',
      };
    }

    return response;
  }

  public async findById(id: number) {
    const classs = await this.classRepository.findOneBy({ id: id });

    let response: IHttpResponse<Class>;
    if (!!classs) {
      response = {
        data: classs,
        status: HttpStatusCode.OK,
        isError: false,
        message: '',
      };
    } else {
      response = {
        status: HttpStatusCode.NOT_FOUND,
        isError: true,
        message: 'Problem with loading user',
      };
    }

    return response;
  }
  public async createClass(classCreateRequest: IClassCreateRequest) {
    const { description, ageGroup, sportId, duration } = classCreateRequest;

    const classs = new Class();
    classs.description = description;
    classs.ageGroup = ageGroup;
    //TODO implement sportService findbyid
    // classs.sport = await this.sportsService.findById(sportId);
    classs.duration = duration;
    const newClass = await this.classRepository.save(classs);

    let response: IHttpResponse<Class>;
    if (!!newClass) {
      response = {
        data: newClass,
        status: HttpStatusCode.CREATED,
        isError: false,
        message: '',
      };
    } else {
      response = {
        status: HttpStatusCode.NOT_FOUND,
        isError: true,
        message: 'Problem with loading user',
      };
    }

    return response;
  }

  public async updateClass(classUpdateRequest: IClassUpdateRequest) {
    const { description, ageGroup, sportId, duration, classId } =
      classUpdateRequest;

    const classs = await this.classRepository.findOneBy({ id: classId });
    classs.description = description;
    classs.ageGroup = ageGroup;
    //TODO implement sportService findbyid
    // classs.sport = await this.sportsService.findById(sportId);
    classs.duration = duration;

    const newClass = await this.classRepository.save(classs);

    let response: IHttpResponse<Class>;
    if (!!newClass) {
      response = {
        data: newClass,
        status: HttpStatusCode.OK,
        isError: false,
        message: '',
      };
    } else {
      response = {
        status: HttpStatusCode.NOT_FOUND,
        isError: true,
        message: 'Problem with loading user',
      };
    }

    return response;
  }

  public async deleteClass(id: number) {
    const classExists = await this.classRepository.exist({
      where: {
        id: id,
      },
    });

    let response: IHttpResponse;
    if (classExists) {
      await this.classRepository.delete({ id: id });

      response = {
        data: null,
        status: HttpStatusCode.OK,
        isError: false,
        message: '',
      };
    } else {
      response = {
        status: HttpStatusCode.BAD_REQUEST,
        isError: true,
        message: 'Problem with deleting class',
      };
    }

    return response;
  }

  public async getClassesFilter(data: any) {
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
      .leftJoinAndSelect('class.classAppointments', 'classAppointments')
      .leftJoinAndSelect('class.reviews', 'review');

    if (data.id) {
      classes.where('class.id = :id', {
        id: data.id,
      });
    }

    const filteredClasses = await classes.getOne();

    const averageReviewRate =
      filteredClasses.reviews.reduce(
        (accumulator, classs) => accumulator + parseInt(classs.rate),
        0
      ) / filteredClasses.reviews.length;

    return {
      filteredClasses: filteredClasses,
      averageReviewRate: averageReviewRate,
    };
  }

  public async enrollToClass(data: any, userParam: User) {
    try {
      const user = await this.userRepository.findOneOrFail({
        relations: {
          classes: true,
        },
        where: {
          id: userParam.id,
        },
      });

      const alreadyEnrolled = user.classes.filter((e) => e.id === data.classId);

      if (alreadyEnrolled.length > 0) {
        return {
          message: 'User already applied to this class',
          status: 404,
          data: {},
        };
      }

      if (user.classes.length < 2) {
        const classs = await this.classRepository.findOneByOrFail({
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

  public async unrollClass(data: any, userParam: User) {
    const user = await this.userRepository.findOneOrFail({
      relations: {
        classes: true,
      },
      where: {
        id: userParam.id,
      },
    });

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
}
