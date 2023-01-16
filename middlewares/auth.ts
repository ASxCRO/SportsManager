import { User } from '@prisma/client';

import jwt from '../utils/jwt';
import createError from 'http-errors';
export default async function auth(req: any, res: any, next: any) {
  if (!req.headers.authorization) {
    return next(createError.Unauthorized('Access token is required'));
  }
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return next(createError.Unauthorized());
  }
  await jwt
    .verifyAccessToken(token)
    .then((user: any) => {
      req.user = user;
      next();
    })
    .catch((e) => {
      next(createError.Unauthorized(e.message));
    });
}
