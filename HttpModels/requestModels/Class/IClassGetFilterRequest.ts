import { AgeGroup } from '../../../enums/AgeGroup';

export interface IClassGetFilterRequest {
  sports: string;
  ageGroup: AgeGroup;
}
