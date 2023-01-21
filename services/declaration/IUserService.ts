import { User } from '../../data/entity/User';
import { IUserUpdateRequest } from '../../HttpModels/requestModels/User/IUserUpdateRequest';
import { IHttpResponse } from '../../HttpModels/responseModels/IHttpResponse';

export interface IUserService {
  all: () => Promise<IHttpResponse<User[]>>;
  findById: (id: number) => Promise<IHttpResponse<User>>;
  update: (
    userUpdateRequest: IUserUpdateRequest
  ) => Promise<IHttpResponse<User>>;
}
