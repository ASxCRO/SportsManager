import { User } from '../../../data/entity/User';

export interface IClassAppointmentUnrollRequest {
  classAppointmentId: number;
  user?: User;
}
