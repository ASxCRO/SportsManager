import { Request, Response } from 'express';
import SportsService from '../services/SportsService';

export default class SportsController {
  /**
   *
   */
  private readonly sportsService: SportsService;

  constructor(private readonly sportService: SportsService) {
    this.sportsService = sportService;
  }

  public async getAll(req: Request, res: Response) {
    try {
      const sports = await this.sportsService.getAll(req.body);

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
      const data: any = await this.sportsService.enrollToClass(req.body);

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
      const data = await this.sportsService.enrollToClassAppointment(req.body);

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
      const data = await this.sportsService.unrollClass(req.body);

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
      const data = await this.sportsService.unrollClassAppointment(req.body);

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
}
