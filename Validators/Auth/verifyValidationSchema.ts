import * as yup from 'yup';

export const verifyValidationSchema = yup
  .object({
    token: yup.string().required(),
  })
  .required();
