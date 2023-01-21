import { AgeGroup } from '../../../enums/AgeGroup';

export interface IClassUpdateRequest {
  description: string;
  ageGroup: AgeGroup;
  sportId: number;
  duration: string;
  classId: number;
}
