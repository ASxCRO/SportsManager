import { User } from '../../../data/entity/User';

export interface IClassUnrollRequest {
  classId: number;
  user?: User;
}
