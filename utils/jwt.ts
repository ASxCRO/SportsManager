import jwt, { Secret } from 'jsonwebtoken';
import createError from 'http-errors';
import dotenv from 'dotenv';

dotenv.config();
const accessTokenSecret = <Secret>process.env.ACCESS_TOKEN_SECRET;
export default class jwtUtil {
  public static signAccessToken(payload: any) {
    return new Promise((resolve, reject) => {
      jwt.sign({ payload }, accessTokenSecret, {}, (err: any, token: any) => {
        if (err) {
          reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  }

  public static async verifyAccessToken(token: any) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, accessTokenSecret, (err: any, payload: any) => {
        if (err) {
          const message =
            err.name == 'JsonWebTokenError' ? 'Unauthorized' : err.message;
          return reject(createError.Unauthorized(message));
        }
        resolve(payload);
      });
    });
  }
}