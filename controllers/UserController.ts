import { UserService } from '../services/UserService';

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
      console.log(e);
      res.status(404).json({
        status: true,
        message: 'problem with fetching',
        data: {},
      });
    }
  }

  public async getOne(req: any, res: any) {
    try {
      const user = await this.usersService.findById(req.query.id);
      res.status(200).json({
        status: true,
        message: 'User fetched',
        data: user,
      });
    } catch (e: any) {
      console.log(e);
      res.status(404).json({
        status: true,
        message: 'problem with fetching',
        data: {},
      });
    }
    return;
  }

  public async deleteUser(req: any, res: any) {
    try {
      await this.usersService.delete(req.body.bodyData.id);
      res.status(200).json({
        status: true,
        message: 'User deleted',
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

  public async updateUser(req: any, res: any) {
    try {
      const newUser = await this.usersService.update(req.body.bodyData);
      res.status(200).json({
        status: true,
        message: 'User updated',
        data: newUser,
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
}
