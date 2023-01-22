import { Repository } from 'typeorm';
import { AppDataSource } from '../../data/data-source';
import { Review } from '../../data/entity/Review';
import HttpStatusCode from '../../enums/HttpStatusCode';
import { IPostReviewRequest } from '../../HttpModels/requestModels/Review/IPostReviewRequest';
import { IHttpResponse } from '../../HttpModels/responseModels/IHttpResponse';
import { IReviewService } from '../declaration/IReviewService';
import { ClassService } from './ClassService';

export class ReviewService implements IReviewService {
  private classService: ClassService;
  private reviewRepository: Repository<Review>;

  constructor() {
    this.classService = new ClassService();
    this.reviewRepository = AppDataSource.getRepository(Review);
  }

  public async postReview(postReviewRequest: IPostReviewRequest) {
    let response: IHttpResponse<Review>;

    const { comment, rate, classId } = postReviewRequest;

    const classResponse = await this.classService.findById(classId);

    if (!classResponse.isError) {
      const review = new Review();
      review.class = classResponse.data;
      review.comment = comment;
      review.rate = rate;

      const newReview = await this.reviewRepository.save(review);

      if (!!newReview) {
        response = {
          data: newReview,
          status: HttpStatusCode.OK,
          isError: false,
          message: '',
        };
      } else {
        response = {
          status: HttpStatusCode.NOT_FOUND,
          isError: true,
          message: 'Problem with saving review',
        };
      }
    }

    return response;
  }

  public async readReviews() {
    let response: IHttpResponse<Review[]>;

    const reviews = await this.reviewRepository.find({
      relations: {
        class: true,
      },
    });

    if (!!reviews) {
      response = {
        data: reviews,
        status: HttpStatusCode.OK,
        isError: false,
        message: '',
      };
    } else {
      response = {
        status: HttpStatusCode.NOT_FOUND,
        isError: true,
        message: 'Problem with loading reviews',
      };
    }

    return response;
  }
}
