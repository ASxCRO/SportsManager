import { Request, Response } from 'express';
import { ValidationError } from 'yup';
import { AdminService } from '../services/AdminService';
import { createClassAppointmentValidationSchema } from '../Validators/Admin/ClassAppointments/createClassAppointmentValidationSchema';
import { updateClassAppointmentValidationSchema } from '../Validators/Admin/ClassAppointments/updateClassAppointmentValidationSchema';
import { createClassValidationSchema } from '../Validators/Admin/Classes/createClassValidationSchema';
import { deleteClassValidationSchema } from '../Validators/Admin/Classes/deleteClassValidationSchema';
import { updateClassValidationSchema } from '../Validators/Admin/Classes/updateClassValidationSchema';

export default class AdminController {
  private adminService = new AdminService();

  public async createClass(req: Request, res: Response) {
    try {
      const data = createClassValidationSchema.validateSync(req.body.bodyData, {
        abortEarly: false,
        stripUnknown: true,
      });

      const newClass = await this.adminService.createClass(data);

      res.status(200).json({
        status: true,
        message: 'Class created',
        data: newClass,
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
  public async updateClass(req: Request, res: Response) {
    try {
      const data = updateClassValidationSchema.validateSync(req.body.bodyData, {
        abortEarly: false,
        stripUnknown: true,
      });
      const newClass = await this.adminService.updateClass(data);
      res.status(200).json({
        status: true,
        message: 'Class updated',
        data: newClass,
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
  public async deleteClass(req: Request, res: Response) {
    try {
      const data = deleteClassValidationSchema.validateSync(req.body.bodyData, {
        abortEarly: false,
        stripUnknown: true,
      });
      await this.adminService.deleteClass(data.id);
      res.status(200).json({
        status: true,
        message: 'Class deleted',
        data: {},
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

  public async createClassAppointment(req: Request, res: Response) {
    try {
      const data = createClassAppointmentValidationSchema.validateSync(
        req.body.bodyData,
        {
          abortEarly: false,
          stripUnknown: true,
        }
      );

      const newClassApp = await this.adminService.createClassAppointment(data);

      res.status(200).json({
        status: true,
        message: 'Class appointment created',
        data: newClassApp,
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

  public async updateClassAppointment(req: Request, res: Response) {
    try {
      const data = updateClassAppointmentValidationSchema.validateSync(
        req.body.bodyData,
        {
          abortEarly: false,
          stripUnknown: true,
        }
      );
      const newClassApp = await this.adminService.updateClassAppointment(data);
      res.status(200).json({
        status: true,
        message: 'Class appointment updated',
        data: newClassApp,
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

  public async deleteClassAppointment(req: Request, res: Response) {
    try {
      const data = deleteClassValidationSchema.validateSync(req.body.bodyData, {
        abortEarly: false,
        stripUnknown: true,
      });
      await this.adminService.deleteClassAppointment(data.id);
      res.status(200).json({
        status: true,
        message: 'Class appointment deleted',
        data: {},
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

  public async readReviews(req: Request, res: Response) {
    try {
      const reviews = await this.adminService.readReviews();
      res.status(200).json({
        status: true,
        message: 'Reviews fetched',
        data: reviews,
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

//todo

//Create & Read Comments on Sport Class

// Each user should be allowed to rate and leave comments for each sports class
// anonymously, but only admins should have access to it. The average rating should be
// applied and calculated for each sports class

// The sports complex requires an admin dashboard where its employees
// would be able to view, edit and manage classes for each of the sports, change dates and times
// for each week and view users who applied for each course in a given period.
