import { Class } from '../../data/entity/Class';
import { IClassCreateRequest } from '../../HttpModels/requestModels/Class/IClassCreateRequest';
import { IClassDeleteRequest } from '../../HttpModels/requestModels/Class/IClassDeleteRequest';
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
}
