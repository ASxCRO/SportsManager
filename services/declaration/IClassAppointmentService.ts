import { ClassAppointment } from '../../data/entity/ClassAppointment';
import { User } from '../../data/entity/User';
import { IClassAppointmentCreateRequest } from '../../HttpModels/requestModels/ClassAppointment/IClassAppointmentCreateRequest';
import { IClassAppointmentDeleteRequest } from '../../HttpModels/requestModels/ClassAppointment/IClassAppointmentDeleteRequest';
import { IClassAppointmentEnrollRequest } from '../../HttpModels/requestModels/ClassAppointment/IClassAppointmentEnrollRequest';
import { IClassAppointmentUnrollRequest } from '../../HttpModels/requestModels/ClassAppointment/IClassAppointmentUnrollRequest';
import { IClassAppointmentUpdateRequest } from '../../HttpModels/requestModels/ClassAppointment/IClassAppointmentUpdateRequest';
import { IHttpResponse } from '../../HttpModels/responseModels/IHttpResponse';

export interface IClassAppointmentService {
  all: () => Promise<IHttpResponse<ClassAppointment[]>>;
  findById: (id: number) => Promise<IHttpResponse<ClassAppointment>>;
  createClassAppointment: (
    classAppointmentCreateRequest: IClassAppointmentCreateRequest
  ) => Promise<IHttpResponse<ClassAppointment>>;
  updateClassAppointment: (
    classAppointmentUpdateRequest: IClassAppointmentUpdateRequest
  ) => Promise<IHttpResponse<ClassAppointment>>;
  deleteClassAppointment: (id: number) => Promise<IHttpResponse>;
  enrollToClassAppointment: (
    classAppointmentEnrollRequest: IClassAppointmentEnrollRequest
  ) => Promise<IHttpResponse<User>>;
  unrollClassAppointment: (
    classAppointmentUnrollRequest: IClassAppointmentUnrollRequest
  ) => Promise<IHttpResponse>;
}
