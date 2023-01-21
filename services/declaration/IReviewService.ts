import { Review } from '../../data/entity/Review';
import { IPostReviewRequest } from '../../HttpModels/requestModels/Review/IPostReviewRequest';
import { IHttpResponse } from '../../HttpModels/responseModels/IHttpResponse';

export interface IReviewService {
  postReview: (
    postReviewRequest: IPostReviewRequest
  ) => Promise<IHttpResponse<Review>>;
  readReviews: (id: number) => Promise<IHttpResponse<Review[]>>;
}
