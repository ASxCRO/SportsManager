import { User } from '../../data/entity/User';
import { ILoginRequest } from '../../HttpModels/requestModels/Auth/ILoginRequest';
import { IRegisterRequest } from '../../HttpModels/requestModels/Auth/IRegisterRequest';
import { IVerifyRequest } from '../../HttpModels/requestModels/Auth/IVerifyRequest';
import { IHttpResponse } from '../../HttpModels/responseModels/IHttpResponse';

export interface IAuthService {
  register: (registerRequest: IRegisterRequest) => Promise<IHttpResponse<any>>;
  login: (loginRequest: ILoginRequest) => Promise<IHttpResponse<User>>;
  verify: (token: string) => Promise<IHttpResponse<any>>;
}
