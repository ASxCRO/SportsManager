import dotenv from 'dotenv';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data/data-source';
import { User } from '../data/entity/User';

dotenv.config();

export default class AdminService {
  constructor(private userRepository: Repository<User>) {}
  public async register(data: any) {}

  public async login(data: any) {}

  public async verify(token: string) {}
}
