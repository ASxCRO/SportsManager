import { AgeGroup } from '../../../enums/AgeGroup';

export interface IClassCreateRequest {
  description: string;
  ageGroup: AgeGroup;
  sportId: number;
  duration: string;
}
