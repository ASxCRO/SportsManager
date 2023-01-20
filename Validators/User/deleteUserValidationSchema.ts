import * as yup from 'yup';

export const deleteUserValidationSchema = yup
  .object({
    id: yup.number().required(),
  })
  .required();
