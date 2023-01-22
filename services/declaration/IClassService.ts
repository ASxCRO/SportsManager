import { Class } from '../../data/entity/Class';
import { User } from '../../data/entity/User';
import { IClassCreateRequest } from '../../HttpModels/requestModels/Class/IClassCreateRequest';
import { IClassEnrollRequest } from '../../HttpModels/requestModels/Class/IClassEnrollRequest';
import { IClassGetDetailsRequest } from '../../HttpModels/requestModels/Class/IClassGetDetailsRequest';
import { IClassGetFilterRequest } from '../../HttpModels/requestModels/Class/IClassGetFilterRequest';
import { IClassUnrollRequest } from '../../HttpModels/requestModels/Class/IClassUnrollRequest';
import { IClassUpdateRequest } from '../../HttpModels/requestModels/Class/IClassUpdateRequest';
import { IHttpResponse } from '../../HttpModels/responseModels/IHttpResponse';

export interface IClassService {
  all: () => Promise<IHttpResponse<Class[]>>;
  findById: (id: number) => Promise<IHttpResponse<Class>>;
  createClass: (
    classCreateRequest: IClassCreateRequest
  ) => Promise<IHttpResponse<Class>>;
  updateClass: (
    classUpdateRequest: IClassUpdateRequest
  ) => Promise<IHttpResponse<Class>>;
  deleteClass: (id: number) => Promise<IHttpResponse>;
  enrollToClass: (
    enrollToClassRequest: IClassEnrollRequest
  ) => Promise<IHttpResponse<User>>;
  unrollClass: (
    unrollClassRequest: IClassUnrollRequest
  ) => Promise<IHttpResponse>;
  getClassesFilter: (
    getClassesFilterRequest: IClassGetFilterRequest
  ) => Promise<IHttpResponse<Class[]>>;
  getDetailsOfClass: (
    detailsOfClassRequest: IClassGetDetailsRequest
  ) => Promise<IHttpResponse<any>>;
}
