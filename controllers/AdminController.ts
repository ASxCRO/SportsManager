import { Response } from 'express';
import { ValidationError } from 'yup';
import { IClassCreateRequest } from '../HttpModels/requestModels/Class/IClassCreateRequest';
import { ISportsAPIRequest } from '../middlewares/models/ISportsAPIRequest';
import { AdminService } from '../services/implementation/AdminService';
import { ClassAppointmentService } from '../services/implementation/ClassAppointmentService';
import { ClassService } from '../services/implementation/ClassService';
import { createClassAppointmentValidationSchema } from '../Validators/Admin/ClassAppointments/createClassAppointmentValidationSchema';
import { updateClassAppointmentValidationSchema } from '../Validators/Admin/ClassAppointments/updateClassAppointmentValidationSchema';
import { createClassValidationSchema } from '../Validators/Admin/Classes/createClassValidationSchema';
import { deleteClassValidationSchema } from '../Validators/Admin/Classes/deleteClassValidationSchema';
import { updateClassValidationSchema } from '../Validators/Admin/Classes/updateClassValidationSchema';

export default class AdminController {
  private classService: ClassService;
  private adminService: AdminService;
  private classAppointmentService: ClassAppointmentService;

  constructor() {
    this.classService = new ClassService();
    this.adminService = new AdminService();
    this.classAppointmentService = new ClassAppointmentService();
  }

  public async createClass(req: ISportsAPIRequest, res: Response) {
    try {
      const data: IClassCreateRequest =
        createClassValidationSchema.validateSync(req.body, {
          abortEarly: false,
          stripUnknown: true,
        });

      const newClass = await this.classService.createClass(data);

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
  public async updateClass(req: ISportsAPIRequest, res: Response) {
    try {
      const data = updateClassValidationSchema.validateSync(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      const newClass = await this.classService.updateClass(data);
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
  public async deleteClass(req: ISportsAPIRequest, res: Response) {
    try {
      const data = deleteClassValidationSchema.validateSync(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      await this.classService.deleteClass(data.id);
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

  public async createClassAppointment(req: ISportsAPIRequest, res: Response) {
    try {
      const data = createClassAppointmentValidationSchema.validateSync(
        req.body,
        {
          abortEarly: false,
          stripUnknown: true,
        }
      );

      const newClassApp =
        await this.classAppointmentService.createClassAppointment(data);

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

  public async updateClassAppointment(req: ISportsAPIRequest, res: Response) {
    try {
      const data = updateClassAppointmentValidationSchema.validateSync(
        req.body,
        {
          abortEarly: false,
          stripUnknown: true,
        }
      );
      const newClassApp =
        await this.classAppointmentService.updateClassAppointment(data);

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

  public async deleteClassAppointment(req: ISportsAPIRequest, res: Response) {
    try {
      const data = deleteClassValidationSchema.validateSync(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      const response =
        await this.classAppointmentService.deleteClassAppointment(data.id);
      res.status(response.status).json({
        status: response.status === 200 ? true : false,
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

//todo

//Create & Read Comments on Sport Class

// Each user should be allowed to rate and leave comments for each sports class
// anonymously, but only admins should have access to it. The average rating should be
// applied and calculated for each sports class

// The sports complex requires an admin dashboard where its employees
// would be able to view, edit and manage classes for each of the sports, change dates and times
// for each week and view users who applied for each course in a given period.
