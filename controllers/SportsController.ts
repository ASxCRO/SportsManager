import { Request, Response } from 'express';
import SportsService from '../services/SportsService';

export default class SportsController {
  public async getAll(req: Request, res: Response) {
    try {
      const sports = await SportsService.getAll(req.body);

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
}
