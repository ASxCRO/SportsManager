import * as yup from 'yup';

export const getOneValidationSchema = yup
  .object({
    id: yup.number().required(),
  })
  .required();
