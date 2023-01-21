import { Response } from 'express';
import { ValidationError } from 'yup';
import { Sport } from '../data/entity/Sport';
import HttpStatusCode from '../enums/HttpStatusCode';
import { IClassEnrollRequest } from '../HttpModels/requestModels/Class/IClassEnrollRequest';
import { IClassGetDetailsRequest } from '../HttpModels/requestModels/Class/IClassGetDetailsRequest';
import { IClassGetFilterRequest } from '../HttpModels/requestModels/Class/IClassGetFilterRequest';
import { IClassAppointmentEnrollRequest } from '../HttpModels/requestModels/ClassAppointment/IClassAppointmentEnrollRequest';
import { IClassAppointmentUnrollRequest } from '../HttpModels/requestModels/ClassAppointment/IClassAppointmentUnrollRequest';
import { ISportGetOneRequest } from '../HttpModels/requestModels/Sport/ISportGetOneRequest';
import { IHttpResponse } from '../HttpModels/responseModels/IHttpResponse';
import { ISportsAPIRequest } from '../middlewares/models/ISportsAPIRequest';
import { ClassAppointmentService } from '../services/implementation/ClassAppointmentService';
import { ClassService } from '../services/implementation/ClassService';
import { SportsService } from '../services/implementation/SportsService';
import { enrollToClassAppointmentValidationSchema } from '../Validators/Sports/enrollToClassAppointmentValidationSchema';
import { enrollToClassValidationSchema } from '../Validators/Sports/enrollToClassValidationSchema';
import { getClassesValidationSchema } from '../Validators/Sports/getClassesValidationSchema';
import { getDetailsOfClassValidationSchema } from '../Validators/Sports/getDetailsOfClassValidationSchema';
import { unrollClassAppointmentValidationSchema } from '../Validators/Sports/unrollClassAppointmentValidationSchema';
import { unrollClassValidationSchema } from '../Validators/Sports/unrollClassValidationSchema';
import { getOneValidationSchema } from '../Validators/User/getOneValidationSchema';

export default class SportsController {
  private sportsService: SportsService;
  private classService: ClassService;
  private classAppointmentService: ClassAppointmentService;

  constructor() {
    this.sportsService = new SportsService();
    this.classService = new ClassService();
    this.classAppointmentService = new ClassAppointmentService();
  }

  public async getAll(res: Response) {
    const allSportsResponse = await this.sportsService.getAll();

    res.status(allSportsResponse.status).json(allSportsResponse);
  }

  public async getOne(req: ISportsAPIRequest, res: Response) {
    let response: IHttpResponse<Sport | string[]>;

    try {
      const data: ISportGetOneRequest = getOneValidationSchema.validateSync(
        req.query,
        {
          abortEarly: false,
          stripUnknown: true,
        }
      );

      response = await this.sportsService.findById(data.id);
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
