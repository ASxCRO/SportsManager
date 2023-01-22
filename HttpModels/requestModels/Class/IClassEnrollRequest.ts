import { User } from '../../../data/entity/User';

export interface IClassEnrollRequest {
  classId: number;
  user?: User;
}
