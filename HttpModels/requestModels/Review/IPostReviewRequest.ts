import { Rate } from '../../../enums/Rate';

export interface IPostReviewRequest {
  comment: string;
  rate: Rate;
  classId: number;
}
