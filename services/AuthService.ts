import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import createError from 'http-errors';

import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from '../utils/jwt';

dotenv.config();

export default class AuthService {
  public static async register(data: any) {
    const { email } = data;
    data.password = bcrypt.hashSync(data.password, 8);
    let user = prisma.user.create({
      data,
    });
    data.accessToken = await jwt.signAccessToken(user);

    return data;
  }

  public static async login(data: any) {
    const { email, password } = data;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw createError.NotFound('User not registered');
    }
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword)
      throw createError.Unauthorized('Email address or password not valid');
    const accessToken = await jwt.signAccessToken(user);
    return { ...user, accessToken };
  }

  public static async all() {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  }
}
