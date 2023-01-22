import { Repository } from 'typeorm';
import { AppDataSource } from '../../data/data-source';
import { Class } from '../../data/entity/Class';
import { User } from '../../data/entity/User';
import { AgeGroup } from '../../enums/AgeGroup';
import HttpStatusCode from '../../enums/HttpStatusCode';
import { IClassCreateRequest } from '../../HttpModels/requestModels/Class/IClassCreateRequest';
import { IClassUpdateRequest } from '../../HttpModels/requestModels/Class/IClassUpdateRequest';
import { IClassGetFilterRequest } from '../../HttpModels/requestModels/Class/IClassGetFilterRequest';

import { IHttpResponse } from '../../HttpModels/responseModels/IHttpResponse';
import { IClassService } from '../declaration/IClassService';
import { SportsService } from './SportsService';
import { UserService } from './UserService';
import { IClassGetDetailsRequest } from '../../HttpModels/requestModels/Class/IClassGetDetailsRequest';
import { IClassEnrollRequest } from '../../HttpModels/requestModels/Class/IClassEnrollRequest';
import { IClassUnrollRequest } from '../../HttpModels/requestModels/Class/IClassUnrollRequest';

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

    let response: IHttpResponse<Class>;

    const sportResponse = await this.sportsService.findById(sportId);

    if (!sportResponse.isError) {
      classs.sport = sportResponse.data;
    } else {
      response = {
        status: HttpStatusCode.NOT_FOUND,
        isError: true,
        message: 'Problem with loading sport',
      };

      return response;
    }
    classs.duration = duration;

    const newClass = await this.classRepository.save(classs);

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

  public async getClassesFilter(
    getClassesFilterRequest: IClassGetFilterRequest
  ) {
    let response: IHttpResponse<Class[]>;

    let classes = AppDataSource.createQueryBuilder(Class, 'class')
      .leftJoinAndSelect('class.sport', 'sport')
      .leftJoinAndSelect('class.classAppointments', 'classAppointments');

    if (getClassesFilterRequest.sports) {
      const sportsFromParams: string[] =
        getClassesFilterRequest.sports.split(',');

      classes.where('sport.name IN (:...sports)', {
        sports: sportsFromParams,
      });
    }

    if (getClassesFilterRequest.ageGroup) {
      const ageGroup: AgeGroup = getClassesFilterRequest.ageGroup;
      classes.andWhere('class.ageGroup = :ageGroup', {
        ageGroup: ageGroup,
      });
    }

    const filteredClasses = await classes.getMany();

    if (!!filteredClasses) {
      response = {
        data: filteredClasses,
        status: HttpStatusCode.OK,
        isError: false,
        message: '',
      };
    } else {
      response = {
        status: HttpStatusCode.BAD_REQUEST,
        isError: true,
        message: 'Problem with filtering classes',
      };
    }

    return response;
  }

  public async getDetailsOfClass(
    detailsOfClassRequest: IClassGetDetailsRequest
  ) {
    let response: IHttpResponse<any>;

    let classes = AppDataSource.createQueryBuilder(Class, 'class')
      .leftJoinAndSelect('class.sport', 'sport')
      .leftJoinAndSelect('class.classAppointments', 'classAppointments')
      .leftJoinAndSelect('class.reviews', 'review');

    if (detailsOfClassRequest.id) {
      classes.where('class.id = :id', {
        id: detailsOfClassRequest.id,
      });
    }

    const filteredClasses = await classes.getOne();

    const averageReviewRate =
      filteredClasses.reviews.reduce(
        (accumulator, classs) => accumulator + parseInt(classs.rate),
        0
      ) / filteredClasses.reviews.length;

    response = {
      status: HttpStatusCode.OK,
      isError: false,
      message: '',
      data: {
        filteredClasses: filteredClasses,
        averageReviewRate: averageReviewRate,
      },
    };

    return response;
  }

  public async enrollToClass(enrollToClassRequest: IClassEnrollRequest) {
    let response: IHttpResponse<User>;

    try {
      const userResponse = await this.userService.findById(
        enrollToClassRequest.user.id
      );

      if (!userResponse.isError) {
        const user = userResponse.data;
        const alreadyEnrolled = user.classes.filter(
          (e) => e.id === enrollToClassRequest.classId
        );
        if (alreadyEnrolled.length > 0) {
          response = {
            status: HttpStatusCode.BAD_REQUEST,
            isError: true,
            message: 'User already enrolled to class',
            data: null,
          };

          return response;
        }

        if (user.classes.length < 2) {
          const classs = await this.classRepository.findOneBy({
            id: enrollToClassRequest.classId,
          });

          if (!!classs) {
            user.classes.push(classs);
            const newUser = await AppDataSource.manager.save(user);

            response = {
              status: HttpStatusCode.OK,
              isError: false,
              message: 'User enrolled',
              data: newUser,
            };
          }
        } else {
          response = {
            status: HttpStatusCode.BAD_REQUEST,
            isError: true,
            message: 'User cant apply to more than 2 classes',
            data: null,
          };
        }
      }
    } catch (error) {
      response = {
        status: HttpStatusCode.BAD_REQUEST,
        isError: true,
        message: 'Problem with enrolling to class',
        data: null,
      };
    }

    return response;
  }

  public async unrollClass(unrollClassRequest: IClassUnrollRequest) {
    let response: IHttpResponse;

    const userResponse = await this.userService.findById(
      unrollClassRequest.user.id
    );

    if (!userResponse.isError) {
      const user = userResponse.data;
      const isEnrolled = user.classes.filter(
        (e) => e.id === unrollClassRequest.classId
      );

      if (isEnrolled.length < 1) {
        response = {
          status: HttpStatusCode.BAD_REQUEST,
          isError: true,
          message: 'User not even enrolled to class',
        };

        return response;
      }

      user.classes = user.classes.filter((classs) => {
        return classs.id !== unrollClassRequest.classId;
      });

      await AppDataSource.manager.save(user);

      response = {
        status: HttpStatusCode.OK,
        isError: false,
        message: 'User unrolled',
        data: null,
      };
    } else {
      response = {
        status: HttpStatusCode.BAD_REQUEST,
        isError: true,
        message: 'Problem with filtering classes',
      };
    }

    return response;
  }
}
