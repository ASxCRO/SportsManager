import * as yup from 'yup';
import { AgeGroup } from '../../enums/AgeGroup';

export const updateClassValidationSchema = yup
  .object({
    description: yup.string().required(),
    ageGroup: yup.mixed<AgeGroup>().oneOf(Object.values(AgeGroup)).required(),
    sportId: yup.number().required(),
    duration: yup.string().required(),
    classId: yup.number().required(),
  })
  .required();
