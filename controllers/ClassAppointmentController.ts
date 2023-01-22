import { Response } from 'express';
import { ValidationError } from 'yup';
import { ClassAppointment } from '../data/entity/ClassAppointment';
import { User } from '../data/entity/User';
import HttpStatusCode from '../enums/HttpStatusCode';
import { IClassAppointmentEnrollRequest } from '../HttpModels/requestModels/ClassAppointment/IClassAppointmentEnrollRequest';
import { IClassAppointmentUnrollRequest } from '../HttpModels/requestModels/ClassAppointment/IClassAppointmentUnrollRequest';
import { IHttpResponse } from '../HttpModels/responseModels/IHttpResponse';
import { ISportsAPIRequest } from '../middlewares/models/ISportsAPIRequest';
import { ClassAppointmentService } from '../services/implementation/ClassAppointmentService';
import { createClassAppointmentValidationSchema } from '../Validators/Admin/ClassAppointments/createClassAppointmentValidationSchema';
import { updateClassAppointmentValidationSchema } from '../Validators/Admin/ClassAppointments/updateClassAppointmentValidationSchema';
import { deleteClassValidationSchema } from '../Validators/Admin/Classes/deleteClassValidationSchema';
import { enrollToClassAppointmentValidationSchema } from '../Validators/Sports/enrollToClassAppointmentValidationSchema';
import { unrollClassAppointmentValidationSchema } from '../Validators/Sports/unrollClassAppointmentValidationSchema';

export class ClassAppointmentController {
  private classAppointmentService: ClassAppointmentService;

  constructor() {
    this.classAppointmentService = new ClassAppointmentService();
  }

  public async createClassAppointment(req: ISportsAPIRequest, res: Response) {
    let response: IHttpResponse<ClassAppointment | string[]>;

    try {
      const data = createClassAppointmentValidationSchema.validateSync(
        req.body,
        {
          abortEarly: false,
          stripUnknown: true,
        }
      );

      response = await this.classAppointmentService.createClassAppointment(
        data
      );
    } catch (e: any) {
      const error = e as ValidationError;

      response = {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        message: 'validation error',
        data: error.errors,
        isError: true,
      };
    }

    res.status(response.status).json(response);
  }

  public async updateClassAppointment(req: ISportsAPIRequest, res: Response) {
    let response: IHttpResponse<ClassAppointment | string[]>;

    try {
      const data = updateClassAppointmentValidationSchema.validateSync(
        req.body,
        {
          abortEarly: false,
          stripUnknown: true,
        }
      );
      response = await this.classAppointmentService.updateClassAppointment(
        data
      );
    } catch (e: any) {
      const error = e as ValidationError;

      response = {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        message: 'validation error',
        data: error.errors,
        isError: true,
      };
    }

    res.status(response.status).json(response);
  }

  public async deleteClassAppointment(req: ISportsAPIRequest, res: Response) {
    let response: IHttpResponse<void | string[]>;

    try {
      const data = deleteClassValidationSchema.validateSync(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      response = await this.classAppointmentService.deleteClassAppointment(
        data.id
      );
    } catch (e: any) {
      const error = e as ValidationError;

      response = {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        message: 'validation error',
        data: error.errors,
        isError: true,
      };
    }

    res.status(response.status).json(response);
  }

  public async enrollToClassAppointment(req: ISportsAPIRequest, res: Response) {
    let response: IHttpResponse<User | string[]>;

    try {
      const data: IClassAppointmentEnrollRequest =
        enrollToClassAppointmentValidationSchema.validateSync(req.body, {
          abortEarly: false,
          stripUnknown: true,
        });

      data.user = req.user;

      response = await this.classAppointmentService.enrollToClassAppointment(
        data
      );
    } catch (e: any) {
      const error = e as ValidationError;

      response = {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        message: 'validation error',
        data: error.errors,
        isError: true,
      };
    }

    res.status(response.status).json(response);
  }

  public async unrollClassAppointment(req: ISportsAPIRequest, res: Response) {
    let response: IHttpResponse<void | string[]>;

    try {
      const data: IClassAppointmentUnrollRequest =
        unrollClassAppointmentValidationSchema.validateSync(req.body, {
          abortEarly: false,
          stripUnknown: true,
        });

      data.user = req.user;

      response = await this.classAppointmentService.unrollClassAppointment(
        data
      );
    } catch (e: any) {
      const error = e as ValidationError;

      response = {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        message: 'validation error',
        data: error.errors,
        isError: true,
      };
    }

    res.status(response.status).json(response);
  }
}
