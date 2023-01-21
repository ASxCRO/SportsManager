import { Repository } from 'typeorm';
import { AppDataSource } from '../../data/data-source';
import { ClassAppointment } from '../../data/entity/ClassAppointment';
import HttpStatusCode from '../../enums/HttpStatusCode';
import { IClassAppointmentCreateRequest } from '../../HttpModels/requestModels/ClassAppointment/IClassAppointmentCreateRequest';
import { IClassAppointmentEnrollRequest } from '../../HttpModels/requestModels/ClassAppointment/IClassAppointmentEnrollRequest';
import { IClassAppointmentUnrollRequest } from '../../HttpModels/requestModels/ClassAppointment/IClassAppointmentUnrollRequest';
import { IClassAppointmentUpdateRequest } from '../../HttpModels/requestModels/ClassAppointment/IClassAppointmentUpdateRequest';
import { IHttpResponse } from '../../HttpModels/responseModels/IHttpResponse';
import { IClassAppointmentService } from '../declaration/IClassAppointmentService';
import { ClassService } from './ClassService';

export class ClassAppointmentService implements IClassAppointmentService {
  private classAppointmentRepository: Repository<ClassAppointment>;
  private classService: ClassService;

  constructor() {
    this.classService = new ClassService();
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

  public async unrollClassAppointment(
    classAppointmentUnrollRequest: IClassAppointmentUnrollRequest
  ) {
    const user = await this.userRepository.findOneOrFail({
      relations: {
        classAppointments: true,
      },
      where: {
        id: classAppointmentUnrollRequest.user.id,
      },
    });
    const isEnrolled = user.classAppointments.filter(
      (e) => e.id === classAppointmentUnrollRequest.classAppointmentId
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
        return (
          classApointment.id !==
          classAppointmentUnrollRequest.classAppointmentId
        );
      }
    );

    const newUser = await AppDataSource.manager.save(user);

    return {
      message: 'Unrolled of class appointment',
      status: 200,
      data: newUser,
    };
  }

  public async enrollToClassAppointment(
    classAppointmentEnrollRequest: IClassAppointmentEnrollRequest
  ) {
    const user = await this.userRepository.findOneOrFail({
      relations: {
        classes: true,
        classAppointments: true,
      },
      where: {
        id: classAppointmentEnrollRequest.user.id,
      },
    });

    const alreadyEnrolled = user.classAppointments.filter(
      (e) => e.id === classAppointmentEnrollRequest.classAppointmentId
    );

    if (alreadyEnrolled.length > 0) {
      return {
        message: 'User already applied to this appointment',
        status: 404,
        data: {},
      };
    }

    const classAppointment =
      await this.classAppointmentRepository.findOneOrFail({
        where: {
          id: classAppointmentEnrollRequest.classAppointmentId,
        },
        relations: {
          classs: true,
        },
      });

    const userClassIds = user.classes.map((e) => e.id);

    const userAppliedToClassOfClassAppointment = userClassIds.includes(
      classAppointment.classs.id
    );

    if (!userAppliedToClassOfClassAppointment) {
      return {
        message: 'User cant apply to class appointment if not applied to class',
        status: 404,
        data: {},
      };
    }

    const usersCountOnAppointment = user.classAppointments.length;

    if (usersCountOnAppointment < 10) {
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
}
