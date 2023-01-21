import { Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data/data-source';
import { Review } from '../data/entity/Review';
import { ClassService } from '../services/implementation/ClassService';
import { ReviewService } from '../services/implementation/ReviewService';

export default class ReviewController {
  private classService: ClassService;
  private reviewService: ReviewService;

  constructor() {
    this.classService = new ClassService();
    this.reviewService = new ReviewService();
  }
  public async postReview(data: any) {
    const { comment, rate, classId } = data;

    const classResponse = await this.classService.findById(classId);

    if (!classResponse.isError) {
      const review = new Review();
      review.class = review.comment = comment;
      review.rate = rate;

      const newReview = await this.reviewRepository.save(review);

      return {
        message: 'New review',
        status: 200,
        data: newReview,
      };
    }

    return {};
  }

  public async readReviews(res: Response) {
    try {
      const reviews = await this.reviewRepository.readReviews();
      res.status(200).json({
        status: true,
        message: 'Reviews fetched',
        data: reviews,
      });
    } catch (e: any) {
      const error = e as ValidationError;

      res.status(422).json({
        status: false,
        message: 'Error',
        data: { errors: error.errors },
      });
    }
  }
}
