import { Request, Response } from 'express';
import { AdminService } from '../services/AdminService';

export default class AdminController {
  private adminService = new AdminService();

  public async createClass(req: Request, res: Response) {
    try {
      const newClass = await this.adminService.createClass(req.body.bodyData);

      res.status(200).json({
        status: true,
        message: 'Class created',
        data: newClass,
      });
    } catch (e: any) {
      console.log(e);
      res.status(404).json({
        status: true,
        message: 'problem with updating',
        data: {},
      });
    }
  }
  public async updateClass(req: Request, res: Response) {
    try {
      const newClass = await this.adminService.updateClass(req.body.bodyData);
      res.status(200).json({
        status: true,
        message: 'Class updated',
        data: newClass,
      });
    } catch (e: any) {
      console.log(e);
      res.status(404).json({
        status: true,
        message: 'problem with updating',
        data: {},
      });
    }
  }
  public async deleteClass(req: Request, res: Response) {
    try {
      await this.adminService.deleteClass(req.body.bodyData.id);
      res.status(200).json({
        status: true,
        message: 'Class deleted',
        data: {},
      });
    } catch (e: any) {
      console.log(e);
      res.status(404).json({
        status: true,
        message: 'problem with fetching',
        data: {},
      });
    }
  }

  public async createClassAppointment(req: Request, res: Response) {
    try {
      const newClassApp = await this.adminService.createClassAppointment(
        req.body.bodyData
      );

      res.status(200).json({
        status: true,
        message: 'Class appointment created',
        data: newClassApp,
      });
    } catch (e: any) {
      console.log(e);
      res.status(404).json({
        status: true,
        message: 'problem with updating',
        data: {},
      });
    }
  }

  public async updateClassAppointment(req: Request, res: Response) {
    try {
      const newClassApp = await this.adminService.updateClassAppointment(
        req.body.bodyData
      );
      res.status(200).json({
        status: true,
        message: 'Class appointment updated',
        data: newClassApp,
      });
    } catch (e: any) {
      console.log(e);
      res.status(404).json({
        status: true,
        message: 'problem with updating',
        data: {},
      });
    }
  }

  public async deleteClassAppointment(req: Request, res: Response) {
    try {
      await this.adminService.deleteClassAppointment(req.body.bodyData.id);
      res.status(200).json({
        status: true,
        message: 'Class appointment deleted',
        data: {},
      });
    } catch (e: any) {
      console.log(e);
      res.status(404).json({
        status: true,
        message: 'problem with fetching',
        data: {},
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
      console.log(e);
      res.status(404).json({
        status: true,
        message: 'problem with fetching',
        data: {},
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
