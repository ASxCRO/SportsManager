import { Response } from 'express';
import { ValidationError } from 'yup';
import { Class } from '../data/entity/Class';
import { User } from '../data/entity/User';
import HttpStatusCode from '../enums/HttpStatusCode';
import { IClassCreateRequest } from '../HttpModels/requestModels/Class/IClassCreateRequest';
import { IClassEnrollRequest } from '../HttpModels/requestModels/Class/IClassEnrollRequest';
import { IClassGetDetailsRequest } from '../HttpModels/requestModels/Class/IClassGetDetailsRequest';
import { IClassGetFilterRequest } from '../HttpModels/requestModels/Class/IClassGetFilterRequest';
import { IClassUnrollRequest } from '../HttpModels/requestModels/Class/IClassUnrollRequest';
import { IHttpResponse } from '../HttpModels/responseModels/IHttpResponse';
import { ISportsAPIRequest } from '../middlewares/models/ISportsAPIRequest';
import { ClassService } from '../services/implementation/ClassService';
import { createClassValidationSchema } from '../Validators/Admin/Classes/createClassValidationSchema';
import { deleteClassValidationSchema } from '../Validators/Admin/Classes/deleteClassValidationSchema';
import { updateClassValidationSchema } from '../Validators/Admin/Classes/updateClassValidationSchema';
import { enrollToClassValidationSchema } from '../Validators/Sports/enrollToClassValidationSchema';
import { getClassesValidationSchema } from '../Validators/Sports/getClassesValidationSchema';
import { getDetailsOfClassValidationSchema } from '../Validators/Sports/getDetailsOfClassValidationSchema';
import { unrollClassValidationSchema } from '../Validators/Sports/unrollClassValidationSchema';

export class ClassController {
  private classService: ClassService;

  constructor() {
    this.classService = new ClassService();
  }
  public async createClass(req: ISportsAPIRequest, res: Response) {
    let response: IHttpResponse<Class | string[]>;

    try {
      const data: IClassCreateRequest =
        createClassValidationSchema.validateSync(req.body, {
          abortEarly: false,
          stripUnknown: true,
        });

      response = await this.classService.createClass(data);
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

  public async updateClass(req: ISportsAPIRequest, res: Response) {
    let response: IHttpResponse<Class | string[]>;

    try {
      const data = updateClassValidationSchema.validateSync(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      response = await this.classService.updateClass(data);
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
  public async deleteClass(req: ISportsAPIRequest, res: Response) {
    let response: IHttpResponse<void | string[]>;

    try {
      const data = deleteClassValidationSchema.validateSync(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      response = await this.classService.deleteClass(data.id);
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

  public async getClassesFilter(req: ISportsAPIRequest, res: Response) {
    let response: IHttpResponse<Class[] | string[]>;

    try {
      const data: IClassGetFilterRequest =
        getClassesValidationSchema.validateSync(req.query, {
          abortEarly: false,
          stripUnknown: true,
        });

      response = await this.classService.getClassesFilter(data);
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

  public async getDetailsOfClass(req: ISportsAPIRequest, res: Response) {
    let response: IHttpResponse<any>;

    try {
      const data: IClassGetDetailsRequest =
        getDetailsOfClassValidationSchema.validateSync(req.params, {
          abortEarly: false,
          stripUnknown: true,
        });

      response = await this.classService.getDetailsOfClass(data);
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

  public async enrollToClass(req: ISportsAPIRequest, res: Response) {
    let response: IHttpResponse<User | string[]>;

    try {
      const data: IClassEnrollRequest =
        enrollToClassValidationSchema.validateSync(req.body, {
          abortEarly: false,
          stripUnknown: true,
        });

      data.user = req.user;

      response = await this.classService.enrollToClass(data);
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

  public async unrollClass(req: ISportsAPIRequest, res: Response) {
    let response: IHttpResponse<void | string[]>;

    try {
      const data: IClassUnrollRequest =
        unrollClassValidationSchema.validateSync(req.body, {
          abortEarly: false,
          stripUnknown: true,
        });

      data.user = req.user;

      response = await this.classService.unrollClass(data);
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
