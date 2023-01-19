import express, { Request, Response } from 'express';
import AdminService from '../services/AdminService';
import UserService from '../services/UserService';

export default class AdminController {
  public async createClass(req: Request, res: Response) {}
  public async updateClass(req: Request, res: Response) {}
  public async deleteClass(req: Request, res: Response) {}

  public async createClassAppointment(req: Request, res: Response) {}
  public async updateClassAppointment(req: Request, res: Response) {}
  public async deleteClassAppointment(req: Request, res: Response) {}
}
