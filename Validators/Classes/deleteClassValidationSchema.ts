import * as yup from 'yup';

export const deleteClassValidationSchema = yup
  .object({
    id: yup.number().required(),
  })
  .required();
