import { Response } from 'express';
import { ValidationError } from 'yup';
import { Review } from '../data/entity/Review';
import HttpStatusCode from '../enums/HttpStatusCode';
import { IPostReviewRequest } from '../HttpModels/requestModels/Review/IPostReviewRequest';
import { IHttpResponse } from '../HttpModels/responseModels/IHttpResponse';
import { ISportsAPIRequest } from '../middlewares/models/ISportsAPIRequest';
import { ReviewService } from '../services/implementation/ReviewService';

export default class ReviewController {
  private reviewService: ReviewService;

  constructor() {
    this.reviewService = new ReviewService();
  }
  public async postReview(req: ISportsAPIRequest, res: Response) {
    let response: IHttpResponse<Review | string[]>;
    const postReviewRequest: IPostReviewRequest = req.body;

    try {
      response = await this.reviewService.postReview(postReviewRequest);
    } catch (e: any) {
      const error = e as ValidationError;

      response = {
        status: HttpStatusCode.NOT_ACCEPTABLE,
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
        status: HttpStatusCode.NOT_ACCEPTABLE,
        message: 'validation error',
        data: error.errors,
        isError: true,
      };
    }

    res.status(response.status).json(response);
  }
}
