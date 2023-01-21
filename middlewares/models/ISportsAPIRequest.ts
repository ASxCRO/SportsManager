import { Request } from 'express';
import { User } from '../../data/entity/User';

export interface ISportsAPIRequest extends Request {
  user?: User;
}
