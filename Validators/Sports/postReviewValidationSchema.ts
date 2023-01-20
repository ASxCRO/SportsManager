// comment, rate, classId;
import * as yup from 'yup';
import { Rate } from '../../enums/Rate';

export const postReviewValidationSchema = yup
  .object({
    comment: yup.string().required(),
    rate: yup.mixed<Rate>().oneOf(Object.values(Rate)).required(),
    classId: yup.number().required(),
  })
  .required();
