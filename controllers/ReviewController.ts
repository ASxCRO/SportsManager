import { Response } from 'express';
import { ValidationError } from 'yup';
import { Review } from '../data/entity/Review';
import HttpStatusCode from '../enums/HttpStatusCode';
import { IPostReviewRequest } from '../HttpModels/requestModels/Review/IPostReviewRequest';
import { IHttpResponse } from '../HttpModels/responseModels/IHttpResponse';
import { ISportsAPIRequest } from '../middlewares/models/ISportsAPIRequest';
import { ReviewService } from '../services/implementation/ReviewService';
import { postReviewValidationSchema } from '../Validators/Review/postReviewValidationSchema';

export default class ReviewController {
  private reviewService: ReviewService;

  constructor() {
    this.reviewService = new ReviewService();
  }
  public async postReview(req: ISportsAPIRequest, res: Response) {
    let response: IHttpResponse<Review | string[]>;

    try {
      const data: IPostReviewRequest = postReviewValidationSchema.validateSync(
        req.body,
        {
          abortEarly: false,
          stripUnknown: true,
        }
      );

      response = await this.reviewService.postReview(data);
    } catch (e: any) {
      const error = e as ValidationError;

      response = {
        status: HttpStatusCode.UNAUTHORIZED,
        message: 'validation error',
        data: error.errors,
        isError: true,
      };
    }

    res.status(response.status).json(response);
  }

  public async readReviews(res: Response) {
    let response: IHttpResponse<Review[] | string[]>;

    try {
      response = await this.reviewService.readReviews();
    } catch (e: any) {
      const error = e as ValidationError;

      response = {
        status: HttpStatusCode.UNAUTHORIZED,
        message: 'validation error',
        data: error.errors,
        isError: true,
      };
    }

    res.status(response.status).json(response);
  }
}
