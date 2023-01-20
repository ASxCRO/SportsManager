import { Request, Response } from 'express';
import { ValidationError } from 'yup';
import { SportsService } from '../services/SportsService';
import { enrollToClassAppointmentValidationSchema } from '../Validators/Sports/enrollToClassAppointmentValidationSchema';
import { enrollToClassValidationSchema } from '../Validators/Sports/enrollToClassValidationSchema';
import { getClassesValidationSchema } from '../Validators/Sports/getClassesValidationSchema';
import { getDetailsOfClassValidationSchema } from '../Validators/Sports/getDetailsOfClassValidationSchema';
import { postReviewValidationSchema } from '../Validators/Sports/postReviewValidationSchema';
import { unrollClassAppointmentValidationSchema } from '../Validators/Sports/unrollClassAppointmentValidationSchema';
import { unrollClassValidationSchema } from '../Validators/Sports/unrollClassValidationSchema';

export default class SportsController {
  private sportsService = new SportsService();

  public async getAll(req: Request, res: Response) {
    try {
      const sports = await this.sportsService.getAll();

      res.status(200).json({
        status: true,
        message: 'sports fetched successfully',
        data: sports,
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

  public async getClasses(req: Request, res: Response) {
    try {
      const data = getClassesValidationSchema.validateSync(req.query, {
        abortEarly: false,
        stripUnknown: true,
      });

      const classes = await this.sportsService.getClasses(data);

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

  public async getDetailsOfClass(req: Request, res: Response) {
    try {
      const data = getDetailsOfClassValidationSchema.validateSync(req.params, {
        abortEarly: false,
        stripUnknown: true,
      });

      const classes = await this.sportsService.getDetailsOfClass(data);

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

  public async enrollToClass(req: Request, res: Response) {
    try {
      const data = enrollToClassValidationSchema.validateSync(
        req.body.bodyData,
        {
          abortEarly: false,
          stripUnknown: true,
        }
      );

      const response: any = await this.sportsService.enrollToClass(
        data,
        req.body.user
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

  public async enrollToClassAppointment(req: Request, res: Response) {
    try {
      const data = enrollToClassAppointmentValidationSchema.validateSync(
        req.body.bodyData,
        {
          abortEarly: false,
          stripUnknown: true,
        }
      );

      const response = await this.sportsService.enrollToClassAppointment(
        data,
        req.body.user
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

  public async unrollClass(req: Request, res: Response) {
    try {
      const data = unrollClassValidationSchema.validateSync(req.body.bodyData, {
        abortEarly: false,
        stripUnknown: true,
      });

      const response = await this.sportsService.unrollClass(
        data,
        req.body.user
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

  public async unrollClassAppointment(req: Request, res: Response) {
    try {
      const data = unrollClassAppointmentValidationSchema.validateSync(
        req.body.bodyData,
        {
          abortEarly: false,
          stripUnknown: true,
        }
      );

      const response = await this.sportsService.unrollClassAppointment(
        data,
        req.body.user
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

  public async postReview(req: Request, res: Response) {
    try {
      const data = postReviewValidationSchema.validateSync(req.body.bodyData, {
        abortEarly: false,
        stripUnknown: true,
      });

      const response = await this.sportsService.postReview(data);

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
