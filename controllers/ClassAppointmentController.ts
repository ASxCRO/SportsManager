import { Response } from 'express';
import { ValidationError } from 'yup';
import { IClassAppointmentEnrollRequest } from '../HttpModels/requestModels/ClassAppointment/IClassAppointmentEnrollRequest';
import { IClassAppointmentUnrollRequest } from '../HttpModels/requestModels/ClassAppointment/IClassAppointmentUnrollRequest';
import { ISportsAPIRequest } from '../middlewares/models/ISportsAPIRequest';
import { ClassAppointmentService } from '../services/implementation/ClassAppointmentService';
import { enrollToClassAppointmentValidationSchema } from '../Validators/Sports/enrollToClassAppointmentValidationSchema';
import { unrollClassAppointmentValidationSchema } from '../Validators/Sports/unrollClassAppointmentValidationSchema';

export class ClassAppointmentController {
  private classAppointmentService: ClassAppointmentService;

  constructor() {
    this.classAppointmentService = new ClassAppointmentService();
  }
  public async enrollToClassAppointment(req: ISportsAPIRequest, res: Response) {
    try {
      const data: IClassAppointmentEnrollRequest =
        enrollToClassAppointmentValidationSchema.validateSync(req.body, {
          abortEarly: false,
          stripUnknown: true,
        });

      data.user = req.user;

      const response =
        await this.classAppointmentService.enrollToClassAppointment(data);

      res.status(response.status).json({
        status: true,
        message: response.message,
        data: response.data,
      });
    } catch (e: any) {
      const error = e as ValidationError;

      res.status(422).json({
        status: false,
        message: 'Error',
        data: { errors: error.errors },
      });
    }
  }

  public async unrollClassAppointment(req: ISportsAPIRequest, res: Response) {
    try {
      const data: IClassAppointmentUnrollRequest =
        unrollClassAppointmentValidationSchema.validateSync(req.body, {
          abortEarly: false,
          stripUnknown: true,
        });

      data.user = req.user;

      const response =
        await this.classAppointmentService.unrollClassAppointment(data);

      res.status(response.status).json({
        status: true,
        message: response.message,
        data: response.data,
      });
    } catch (e: any) {
      const error = e as ValidationError;

      res.status(422).json({
        status: false,
        message: 'Error',
        data: { errors: error.errors },
      });
    }
  }
}
