import { Review } from '../../data/entity/Review';
import { IHttpResponse } from '../../HttpModels/responseModels/IHttpResponse';

export interface IReviewService {
  postReview: () => Promise<IHttpResponse<Review>>;
  readReviews: (id: number) => Promise<IHttpResponse<Review[]>>;
}
