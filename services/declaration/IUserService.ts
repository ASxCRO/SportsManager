import { User } from '../../data/entity/User';
import { IUserUpdateRequest } from '../../HttpModels/requestModels/User/IUserUpdateRequest';
import { IHttpResponse } from '../../HttpModels/responseModels/IHttpResponse';

export interface IUserService {
  all: () => Promise<IHttpResponse<User[]>>;
  findById: (id: number) => Promise<IHttpResponse<User>>;
  findByEmail: (email: string) => Promise<IHttpResponse<User>>;
  update: (
    userUpdateRequest: IUserUpdateRequest
  ) => Promise<IHttpResponse<User>>;
  delete: (id: number) => Promise<IHttpResponse>;
  exists: (email: string) => Promise<IHttpResponse<boolean>>;
  create: (user: User) => Promise<IHttpResponse<User>>;
}
