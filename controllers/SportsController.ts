import { Request, Response } from 'express';
import { SportsService } from '../services/SportsService';

export default class SportsController {
  private sportsService = new SportsService();

  public async getAll(req: Request, res: Response) {
    try {
      const sports = await this.sportsService.getAll(req.body.bodyData);

      res.status(200).json({
        status: true,
        message: 'sports fetched successfully',
        data: sports,
      });
    } catch (e: any) {
      res.status(404).json({
        status: true,
        message: 'Problem with fetching sports',
        data: {},
      });
    }
  }

  public async getClasses(req: Request, res: Response) {
    try {
      const classes = await this.sportsService.getClasses(req.query);

      res.status(200).json({
        status: true,
        message: 'classes fetched successfully',
        data: classes,
      });
    } catch (e: any) {
      console.log(e);

      res.status(404).json({
        status: true,
        message: 'Problem with fetching classes',
        data: {},
      });
    }
  }

  public async getDetailsOfClass(req: Request, res: Response) {
    try {
      const classes = await this.sportsService.getDetailsOfClass(req.params);

      res.status(200).json({
        status: true,
        message: 'classes fetched successfully',
        data: classes,
      });
    } catch (e: any) {
      res.status(404).json({
        status: true,
        message: 'Problem with fetching classes',
        data: {},
      });
    }
  }

  public async enrollToClass(req: Request, res: Response) {
    try {
      const data: any = await this.sportsService.enrollToClass(
        req.body.bodyData,
        req.body.user
      );

      res.status(data.status).json({
        status: true,
        message: data.message,
        data: data.data,
      });
    } catch (e: any) {
      res.status(404).json({
        status: true,
        message: 'Problem with enrolling',
        data: {},
      });
    }
  }

  public async enrollToClassAppointment(req: Request, res: Response) {
    try {
      const data = await this.sportsService.enrollToClassAppointment(
        req.body.bodyData,
        req.body.user
      );

      res.status(data.status).json({
        status: true,
        message: data.message,
        data: data.data,
      });
    } catch (e: any) {
      console.log(e);

      res.status(404).json({
        status: true,
        message: 'Problem with enrolling',
        data: {},
      });
    }
  }

  public async unrollClass(req: Request, res: Response) {
    try {
      const data = await this.sportsService.unrollClass(
        req.body.bodyData,
        req.body.user
      );

      res.status(data.status).json({
        status: true,
        message: data.message,
        data: data.data,
      });
    } catch (e: any) {
      console.log(e);

      res.status(404).json({
        status: true,
        message: 'Problem with unrolling',
        data: {},
      });
    }
  }

  public async unrollClassAppointment(req: Request, res: Response) {
    try {
      const data = await this.sportsService.unrollClassAppointment(
        req.body.bodyData,
        req.body.user
      );

      res.status(data.status).json({
        status: true,
        message: data.message,
        data: data.data,
      });
    } catch (e: any) {
      console.log(e);

      res.status(404).json({
        status: true,
        message: 'Problem with unrolling',
        data: {},
      });
    }
  }

  public async postReview(req: Request, res: Response) {
    try {
      const data = await this.sportsService.postReview(req.body.bodyData);

      res.status(data.status).json({
        status: true,
        message: data.message,
        data: data.data,
      });
    } catch (e: any) {
      console.log(e);

      res.status(404).json({
        status: true,
        message: 'Problem with posting review',
        data: {},
      });
    }
  }
}
