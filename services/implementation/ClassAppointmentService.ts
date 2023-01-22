import { Repository } from 'typeorm';
import { AppDataSource } from '../../data/data-source';
import { ClassAppointment } from '../../data/entity/ClassAppointment';
import { User } from '../../data/entity/User';
import HttpStatusCode from '../../enums/HttpStatusCode';
import { IClassAppointmentCreateRequest } from '../../HttpModels/requestModels/ClassAppointment/IClassAppointmentCreateRequest';
import { IClassAppointmentEnrollRequest } from '../../HttpModels/requestModels/ClassAppointment/IClassAppointmentEnrollRequest';
import { IClassAppointmentUnrollRequest } from '../../HttpModels/requestModels/ClassAppointment/IClassAppointmentUnrollRequest';
import { IClassAppointmentUpdateRequest } from '../../HttpModels/requestModels/ClassAppointment/IClassAppointmentUpdateRequest';
import { IHttpResponse } from '../../HttpModels/responseModels/IHttpResponse';
import { IClassAppointmentService } from '../declaration/IClassAppointmentService';
import { ClassService } from './ClassService';
import { UserService } from './UserService';

export class ClassAppointmentService implements IClassAppointmentService {
  private classAppointmentRepository: Repository<ClassAppointment>;
  private classService: ClassService;
  private userService: UserService;

  constructor() {
    this.classService = new ClassService();
    this.userService = new UserService();

    this.classAppointmentRepository =
      AppDataSource.getRepository(ClassAppointment);
  }

  public async all() {
    const allClassAppointments = await this.classAppointmentRepository.find({
      relations: {
        classs: true,
      },
    });

    let response: IHttpResponse<ClassAppointment[]>;
    if (allClassAppointments.length > 0) {
      response = {
        data: allClassAppointments,
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
    const classAppointment = await this.classAppointmentRepository.findOneBy({
      id: id,
    });

    let response: IHttpResponse<ClassAppointment>;
    if (!!classAppointment) {
      response = {
        data: classAppointment,
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

  public async createClassAppointment(
    classAppointmentCreateRequest: IClassAppointmentCreateRequest
  ) {
    const { description, classId, dateStarting } =
      classAppointmentCreateRequest;

    const classsApp = new ClassAppointment();
    classsApp.description = description;
    classsApp.dateStarting = dateStarting;
    const classResponse = await this.classService.findById(classId);

    let response: IHttpResponse<ClassAppointment>;

    if (!classResponse.isError) {
      classsApp.classs = classResponse.data;
    } else {
      response = {
        status: HttpStatusCode.NOT_FOUND,
        isError: true,
        message: 'Problem with finding suitable class',
      };

      return response;
    }

    const newClassApp = await this.classAppointmentRepository.save(classsApp);

    if (!!newClassApp) {
      response = {
        data: newClassApp,
        status: HttpStatusCode.CREATED,
        isError: false,
        message: 'class appointment created',
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

  public async updateClassAppointment(
    classAppointmentUpdateRequest: IClassAppointmentUpdateRequest
  ) {
    const { description, classId, dateStarting, classAppointmentId } =
      classAppointmentUpdateRequest;

    const classsApp = await this.classAppointmentRepository.findOneBy({
      id: classAppointmentId,
    });
    classsApp.dateStarting = dateStarting;
    const classResponse = await this.classService.findById(classId);

    let response: IHttpResponse<ClassAppointment>;

    if (!classResponse.isError) {
      classsApp.classs = classResponse.data;
    } else {
      response = {
        status: HttpStatusCode.NOT_FOUND,
        isError: true,
        message: 'Problem with finding suitable class',
      };

      return response;
    }
    classsApp.description = description;

    const newClassApp = await this.classAppointmentRepository.save(classsApp);

    if (!!newClassApp) {
      response = {
        data: newClassApp,
        status: HttpStatusCode.OK,
        isError: false,
        message: 'class appointment updated',
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

  public async deleteClassAppointment(id: number) {
    const classAppExists = await this.classAppointmentRepository.exist({
      where: {
        id: id,
      },
    });

    let response: IHttpResponse;
    if (classAppExists) {
      await this.classAppointmentRepository.delete({ id: id });

      response = {
        data: null,
        status: HttpStatusCode.OK,
        isError: false,
        message: 'user deleted',
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

  public async unrollClassAppointment(
    classAppointmentUnrollRequest: IClassAppointmentUnrollRequest
  ) {
    let response: IHttpResponse;

    const userResponse = await this.userService.findById(
      classAppointmentUnrollRequest.user.id
    );

    if (!userResponse.isError) {
      const user = userResponse.data;

      const isEnrolled = user.classAppointments.filter(
        (e) => e.id === classAppointmentUnrollRequest.classAppointmentId
      );

      if (isEnrolled.length < 1) {
        response = {
          data: null,
          status: HttpStatusCode.BAD_REQUEST,
          isError: true,
          message: 'User not even enrolled to class appointment',
        };

        return response;
      }

      user.classAppointments = user.classAppointments.filter(
        (classApointment) => {
          return (
            classApointment.id !==
            classAppointmentUnrollRequest.classAppointmentId
          );
        }
      );

      await AppDataSource.manager.save(user);

      response = {
        data: null,
        status: HttpStatusCode.OK,
        isError: false,
        message: 'user unrolled',
      };
    }

    return response;
  }

  public async enrollToClassAppointment(
    classAppointmentEnrollRequest: IClassAppointmentEnrollRequest
  ) {
    let response: IHttpResponse<User>;

    const userResponse = await this.userService.findById(
      classAppointmentEnrollRequest.user.id
    );

    if (!userResponse.isError) {
      const user = userResponse.data;

      const alreadyEnrolled = user.classAppointments.filter(
        (e) => e.id === classAppointmentEnrollRequest.classAppointmentId
      );

      if (alreadyEnrolled.length > 0) {
        response = {
          data: null,
          status: HttpStatusCode.BAD_REQUEST,
          isError: true,
          message: 'User already applied to class appointment',
        };

        return response;
      }

      const classAppointment =
        await this.classAppointmentRepository.findOneOrFail({
          where: {
            id: classAppointmentEnrollRequest.classAppointmentId,
          },
          relations: {
            classs: true,
            users: true,
          },
        });

      const userClassIds = user.classes.map((e) => e.id);

      const userAppliedToClassOfClassAppointment = userClassIds.includes(
        classAppointment.classs.id
      );

      if (!userAppliedToClassOfClassAppointment) {
        response = {
          data: null,
          status: HttpStatusCode.BAD_REQUEST,
          isError: true,
          message:
            'User cant apply to class appointment if not applied to class itself',
        };

        return response;
      }

      const usersCountOnAppointment = classAppointment.users.length;

      if (usersCountOnAppointment < 10) {
        response = {
          data: user,
          status: HttpStatusCode.OK,
          isError: false,
          message: '',
        };
      } else {
        response = {
          data: null,
          status: HttpStatusCode.BAD_REQUEST,
          isError: true,
          message: 'User cant apply bcs slots are full',
        };
      }

      return response;
    }
  }
}
