import express, { Request, Response } from 'express';
import { ValidationError } from 'yup';
import AuthService from '../services/AuthService';
import { registerValidationSchema } from '../Validators/Auth/Register';

export default class AuthController {
  private authService = new AuthService();

  public async register(req: Request, res: Response) {
    try {
      const data = registerValidationSchema.validateSync(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      const user = await this.authService.register(data);

      res.status(200).json({
        status: true,
        message: 'User created successfully',
        data: user,
      });
    } catch (e: any) {
      const error = e as ValidationError;

      res.status(422).json({
        status: true,
        message:
          'User with this email already exists or problem with registering',
        data: { errors: error.errors },
      });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const data = await this.authService.login(req.body);
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
      const data = await this.authService.verify(req.query.token.toString());
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
