import { ValidationError } from 'yup';
import { Review } from '../../data/entity/Review';
import { IReviewService } from '../declaration/IReviewService';
import { ClassService } from './ClassService';

export class ReviewService implements IReviewService {
  private classService: ClassService;

  constructor() {
    this.classService = new ClassService();
  }
}
