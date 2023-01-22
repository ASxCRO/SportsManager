import * as yup from 'yup';
import { AgeGroup } from '../../enums/AgeGroup';

export const getClassesValidationSchema = yup
  .object({
    sports: yup.string().required(),
    ageGroup: yup.mixed<AgeGroup>().oneOf(Object.values(AgeGroup)).required(),
  })
  .required();
