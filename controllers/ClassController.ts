import { Response } from 'express';
import { ValidationError } from 'yup';
import { IClassEnrollRequest } from '../HttpModels/requestModels/Class/IClassEnrollRequest';
import { IClassGetDetailsRequest } from '../HttpModels/requestModels/Class/IClassGetDetailsRequest';
import { IClassGetFilterRequest } from '../HttpModels/requestModels/Class/IClassGetFilterRequest';
import { ISportsAPIRequest } from '../middlewares/models/ISportsAPIRequest';
import { ClassService } from '../services/implementation/ClassService';
import { enrollToClassValidationSchema } from '../Validators/Sports/enrollToClassValidationSchema';
import { getClassesValidationSchema } from '../Validators/Sports/getClassesValidationSchema';
import { getDetailsOfClassValidationSchema } from '../Validators/Sports/getDetailsOfClassValidationSchema';
import { unrollClassValidationSchema } from '../Validators/Sports/unrollClassValidationSchema';

export class ClassController {
  private classService: ClassService;

  constructor() {
    this.classService = new ClassService();
  }
  public async getClassesFilter(req: ISportsAPIRequest, res: Response) {
    try {
      const data: IClassGetFilterRequest =
        getClassesValidationSchema.validateSync(req.query, {
          abortEarly: false,
          stripUnknown: true,
        });

      const classes = await this.classService.getClassesFilter(data);

      res.status(200).json({
        status: true,
        message: 'classes fetched successfully',
        data: classes,
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

  public async getDetailsOfClass(req: ISportsAPIRequest, res: Response) {
    try {
      const data: IClassGetDetailsRequest =
        getDetailsOfClassValidationSchema.validateSync(req.params, {
          abortEarly: false,
          stripUnknown: true,
        });

      const classes = await this.classService.getDetailsOfClass(data);

      res.status(200).json({
        status: true,
        message: 'classes fetched successfully',
        data: classes,
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

  public async enrollToClass(req: ISportsAPIRequest, res: Response) {
    try {
      const data: IClassEnrollRequest =
        enrollToClassValidationSchema.validateSync(req.body, {
          abortEarly: false,
          stripUnknown: true,
        });

      const response: any = await this.classService.enrollToClass(
        data,
        req.user
      );

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

  public async unrollClass(req: ISportsAPIRequest, res: Response) {
    try {
      const data = unrollClassValidationSchema.validateSync(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      const response = await this.classService.unrollClass(data, req.user);

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
