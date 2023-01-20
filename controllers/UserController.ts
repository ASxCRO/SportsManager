import { ValidationError } from 'yup';
import { UserService } from '../services/UserService';
import { deleteUserValidationSchema } from '../Validators/User/deleteUserValidationSchema';
import { getOneValidationSchema } from '../Validators/User/getOneValidationSchema';
import { updateUserValidationSchema } from '../Validators/User/updateUserValidationSchema';

export default class UserController {
  private usersService = new UserService();

  public async getAll(req: any, res: any) {
    try {
      const users = await this.usersService.all();
      res.status(200).json({
        status: true,
        message: 'All users fetched',
        data: users,
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

  public async getOne(req: any, res: any) {
    try {
      const data = getOneValidationSchema.validateSync(req.query, {
        abortEarly: false,
        stripUnknown: true,
      });

      const user = await this.usersService.findById(data.id);
      res.status(200).json({
        status: true,
        message: 'User fetched',
        data: user,
      });
    } catch (e: any) {
      const error = e as ValidationError;

      res.status(422).json({
        status: false,
        message: 'Error',
        data: { errors: error.errors },
      });
    }
    return;
  }

  public async deleteUser(req: any, res: any) {
    try {
      const data = deleteUserValidationSchema.validateSync(req.body.bodyData, {
        abortEarly: false,
        stripUnknown: true,
      });

      const response = await this.usersService.delete(data.id);
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

  public async updateUser(req: any, res: any) {
    try {
      const data = updateUserValidationSchema.validateSync(req.body.bodyData, {
        abortEarly: false,
        stripUnknown: true,
      });

      const newUser = await this.usersService.update(data);
      res.status(200).json({
        status: true,
        message: 'User updated',
        data: newUser,
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
