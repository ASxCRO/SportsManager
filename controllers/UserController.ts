import { HttpError } from 'http-errors';
import { ValidationError } from 'yup';
import { User } from '../data/entity/User';
import HttpStatusCode from '../enums/HttpStatusCode';
import { IHttpResponse } from '../HttpModels/responseModels/IHttpResponse';
import { UserService } from '../services/implementation/UserService';
import { deleteUserValidationSchema } from '../Validators/User/deleteUserValidationSchema';
import { getOneValidationSchema } from '../Validators/User/getOneValidationSchema';
import { updateUserValidationSchema } from '../Validators/User/updateUserValidationSchema';

export default class UserController {
  private usersService = new UserService();

  public async getAll(req: any, res: any) {
    const allUsersResponse = await this.usersService.all();

    res.status(allUsersResponse.status).json(allUsersResponse);
  }

  public async getOne(req: any, res: any) {
    let response: IHttpResponse<User | string[]>;

    try {
      const data = getOneValidationSchema.validateSync(req.query, {
        abortEarly: false,
        stripUnknown: true,
      });

      response = await this.usersService.findById(data.id);
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

  public async deleteUser(req: any, res: any) {
    let response: IHttpResponse<string[]>;
    try {
      const data = deleteUserValidationSchema.validateSync(req.body.bodyData, {
        abortEarly: false,
        stripUnknown: true,
      });

      response = await this.usersService.delete(data.id);
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

  public async updateUser(req: any, res: any) {
    let response: IHttpResponse<User | string[]>;

    try {
      const data = updateUserValidationSchema.validateSync(req.body.bodyData, {
        abortEarly: false,
        stripUnknown: true,
      });

      response = await this.usersService.update(data);
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
