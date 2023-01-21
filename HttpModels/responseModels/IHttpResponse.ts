import HttpStatusCode from '../../enums/HttpStatusCode';

export interface IHttpResponse<T = void> {
  status: HttpStatusCode;
  data?: T;
  isError: boolean;
  message: string;
}
