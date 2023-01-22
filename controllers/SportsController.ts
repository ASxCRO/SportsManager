import { Response } from 'express';
import { ValidationError } from 'yup';
import { Sport } from '../data/entity/Sport';
import HttpStatusCode from '../enums/HttpStatusCode';
import { ISportGetOneRequest } from '../HttpModels/requestModels/Sport/ISportGetOneRequest';
import { IHttpResponse } from '../HttpModels/responseModels/IHttpResponse';
import { ISportsAPIRequest } from '../middlewares/models/ISportsAPIRequest';
import { SportsService } from '../services/implementation/SportsService';
import { getOneValidationSchema } from '../Validators/User/getOneValidationSchema';

export default class SportsController {
  private sportsService: SportsService;

  constructor() {
    this.sportsService = new SportsService();
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
        status: HttpStatusCode.UNAUTHORIZED,
        message: 'validation error',
        data: error.errors,
        isError: true,
      };
    }

    res.status(response.status).json(response);
  }
}
