import { Request, Response } from 'express';
import { ValidationError } from 'yup';
import { AuthService } from '../services/AuthService';
import { loginValidationSchema } from '../Validators/Auth/loginValidationSchema';
import { registerValidationSchema } from '../Validators/Auth/registerValidationSchema';
import { verifyValidationSchema } from '../Validators/Auth/verifyValidationSchema';

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
        status: false,
        message: 'Error registering',
        data: { errors: error.errors },
      });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const data = loginValidationSchema.validateSync(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      const response = await this.authService.login(data);
      res.status(response.status).json({
        status: false,
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

  public async verify(req: Request, res: Response) {
    try {
      const data = verifyValidationSchema.validateSync(req.query, {
        abortEarly: false,
        stripUnknown: true,
      });

      const response = await this.authService.verify(data.token);
      res.status(200).json({
        status: true,
        message: 'Account verification successful',
        data: response,
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
