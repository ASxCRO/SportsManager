import jwt from '../utils/jwt';
import createError from 'http-errors';
import { UserRole } from '../enums/Roles';
import { Request } from 'express';

export default async function auth(req: Request, res: any, next: any) {
  if (!req.headers.authorization) {
    return next(createError.Unauthorized('Access token is required'));
  }

  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return next(createError.Unauthorized('Token not valid'));
  }

  await jwt
    .verifyAccessToken(token)
    .then((user: any) => {
      if (
        req.originalUrl.includes('admin') ||
        req.originalUrl.includes('users')
      ) {
        const userRole = user.payload.role;

        if (userRole !== UserRole.ADMIN) {
          next(
            createError.Unauthorized(
              'User attempt to perform action blocked by authorization rules'
            )
          );
        }
      }

      req.body = { bodyData: req.body, user: user.payload };

      next();
    })
    .catch((e) => {
      next(createError.Unauthorized(e.message));
    });
}
