import * as yup from 'yup';

export const enrollToClassValidationSchema = yup
  .object({
    classId: yup.number().required(),
  })
  .required();
