import { Response } from 'express';
import { ValidationError } from 'yup';
import { User } from '../data/entity/User';
import HttpStatusCode from '../enums/HttpStatusCode';
import { ILoginRequest } from '../HttpModels/requestModels/Auth/ILoginRequest';
import { IRegisterRequest } from '../HttpModels/requestModels/Auth/IRegisterRequest';
import { IVerifyRequest } from '../HttpModels/requestModels/Auth/IVerifyRequest';
import { IHttpResponse } from '../HttpModels/responseModels/IHttpResponse';
import { ISportsAPIRequest } from '../middlewares/models/ISportsAPIRequest';
import { AuthService } from '../services/implementation/AuthService';
import { loginValidationSchema } from '../Validators/Auth/loginValidationSchema';
import { registerValidationSchema } from '../Validators/Auth/registerValidationSchema';
import { verifyValidationSchema } from '../Validators/Auth/verifyValidationSchema';

export default class AuthController {
  private authService = new AuthService();

  public async register(req: ISportsAPIRequest, res: Response) {
    let response: IHttpResponse<User | string[]>;

    try {
      const data: IRegisterRequest = registerValidationSchema.validateSync(
        req.body,
        {
          abortEarly: false,
          stripUnknown: true,
        }
      );

      response = await this.authService.register(data);
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

  public async login(req: ISportsAPIRequest, res: Response) {
    let response: IHttpResponse<User | string[]>;

    try {
      const data: ILoginRequest = loginValidationSchema.validateSync(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      response = await this.authService.login(data);
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

  public async verify(req: ISportsAPIRequest, res: Response) {
    let response: IHttpResponse<any>;

    try {
      const data: IVerifyRequest = verifyValidationSchema.validateSync(
        req.query,
        {
          abortEarly: false,
          stripUnknown: true,
        }
      );

      response = await this.authService.verify(data.token);
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
