import * as yup from 'yup';

export const unrollClassValidationSchema = yup
  .object({
    classId: yup.number().required(),
  })
  .required();
