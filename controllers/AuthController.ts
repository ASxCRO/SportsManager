import express, { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import AuthService from '../services/AuthService';

export default class AuthController {
  public async register(req: Request, res: Response) {
    try {
      const user = await AuthService.register(req.body);

      res.status(200).json({
        status: true,
        message: 'User created successfully',
        data: user,
      });
    } catch (e: any) {
      res.status(404).json({
        status: true,
        message: 'User with this email already exists',
        data: {},
      });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const data = await AuthService.login(req.body);
      res.status(data.status).json({
        status: true,
        message: data.message,
        data: data.data,
      });
    } catch (e: any) {
      console.log(e);
    }
  }

  public async verify(req: Request, res: Response) {
    try {
      const data = await AuthService.verify(req.query.token.toString());
      res.status(200).json({
        status: true,
        message: 'Account verification successful',
        data,
      });
    } catch (e: any) {
      console.log(e);
    }
  }
}
