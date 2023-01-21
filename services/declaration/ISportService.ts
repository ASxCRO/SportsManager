import { Sport } from '../../data/entity/Sport';
import { IHttpResponse } from '../../HttpModels/responseModels/IHttpResponse';

export interface ISportService {
  getAll: () => Promise<IHttpResponse<Sport[]>>;
  findById: (id: number) => Promise<IHttpResponse<Sport>>;
}
