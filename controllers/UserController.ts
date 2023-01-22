import { Response } from 'express';
import { ValidationError } from 'yup';
import { User } from '../data/entity/User';
import HttpStatusCode from '../enums/HttpStatusCode';
import { IUserDeleteRequest } from '../HttpModels/requestModels/User/IUserDeleteRequest';
import { IUserGetOneRequest } from '../HttpModels/requestModels/User/IUserGetOneRequest';
import { IUserUpdateRequest } from '../HttpModels/requestModels/User/IUserUpdateRequest';
import { IHttpResponse } from '../HttpModels/responseModels/IHttpResponse';
import { ISportsAPIRequest } from '../middlewares/models/ISportsAPIRequest';
import { UserService } from '../services/implementation/UserService';
import { deleteUserValidationSchema } from '../Validators/User/deleteUserValidationSchema';
import { getOneValidationSchema } from '../Validators/User/getOneValidationSchema';
import { updateUserValidationSchema } from '../Validators/User/updateUserValidationSchema';

export default class UserController {
  private usersService: UserService;

  constructor() {
    this.usersService = new UserService();
  }

  public async getAll(res: Response) {
    const allUsersResponse = await this.usersService.all();

    res.status(allUsersResponse.status).json(allUsersResponse);
  }

  public async getOne(req: ISportsAPIRequest, res: Response) {
    let response: IHttpResponse<User | string[]>;

    try {
      const data: IUserGetOneRequest = getOneValidationSchema.validateSync(
        req.query,
        {
          abortEarly: false,
          stripUnknown: true,
        }
      );

      response = await this.usersService.findById(data.id);
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

  public async deleteUser(req: ISportsAPIRequest, res: Response) {
    let response: IHttpResponse<any>;
    try {
      const data: IUserDeleteRequest = deleteUserValidationSchema.validateSync(
        req.body,
        {
          abortEarly: false,
          stripUnknown: true,
        }
      );

      response = await this.usersService.delete(data.id);
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

  public async updateUser(req: ISportsAPIRequest, res: Response) {
    let response: IHttpResponse<User | string[]>;

    try {
      const data: IUserUpdateRequest = updateUserValidationSchema.validateSync(
        req.body,
        {
          abortEarly: false,
          stripUnknown: true,
        }
      );

      response = await this.usersService.update(data);
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
