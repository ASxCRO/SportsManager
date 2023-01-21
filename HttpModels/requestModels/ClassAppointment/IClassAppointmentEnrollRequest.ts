import { User } from '../../../data/entity/User';

export interface IClassAppointmentEnrollRequest {
  classAppointmentId: number;
  user: User;
}
