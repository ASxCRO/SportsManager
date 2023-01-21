import { Response } from 'express';
import { Repository } from 'typeorm';
import { ValidationError } from 'yup';
import { AppDataSource } from '../data/data-source';
import { Review } from '../data/entity/Review';
import HttpStatusCode from '../enums/HttpStatusCode';
import { IPostReviewRequest } from '../HttpModels/requestModels/Review/IPostReviewRequest';
import { IHttpResponse } from '../HttpModels/responseModels/IHttpResponse';
import { ISportsAPIRequest } from '../middlewares/models/ISportsAPIRequest';
import { ClassService } from '../services/implementation/ClassService';
import { ReviewService } from '../services/implementation/ReviewService';

export default class ReviewController {
  private classService: ClassService;
  private reviewService: ReviewService;

  constructor() {
    this.classService = new ClassService();
    this.reviewService = new ReviewService();
  }
  public async postReview(req: ISportsAPIRequest, res: Response) {
    let response: IHttpResponse<Review | string[]>;
    const { comment, rate, classId } = req.body;

    const classResponse = await this.reviewService.postReview(classId);

    if (!classResponse.isError) {
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
    }

    return response;
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
