import express, { Request, Response } from 'express';
import AdminService from '../services/AdminService';
import UserService from '../services/UserService';

export default class AdminController {
  public async createClass(req: Request, res: Response) {}

  public async updateClass(req: Request, res: Response) {}
  public async deleteClass(req: Request, res: Response) {}

  public async getAllUsers(req: Request, res: Response) {}

  public async deleteUser(req: Request, res: Response) {}

  public async createUser(req: Request, res: Response) {}

  public async updateUser(req: Request, res: Response) {}
}
