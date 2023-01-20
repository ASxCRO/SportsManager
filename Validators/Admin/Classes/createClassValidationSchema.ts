import * as yup from 'yup';
import { AgeGroup } from '../../../enums/AgeGroup';

export const createClassValidationSchema = yup
  .object({
    description: yup.string().required(),
    ageGroup: yup.mixed<AgeGroup>().oneOf(Object.values(AgeGroup)).required(),
    sportId: yup.number().required(),
    duration: yup.string().required(),
  })
  .required();
