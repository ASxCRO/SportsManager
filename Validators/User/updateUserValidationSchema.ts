import * as yup from 'yup';

export const updateUserValidationSchema = yup
  .object({
    id: yup.number().required(),
    name: yup.string().required(),
  })
  .required();
