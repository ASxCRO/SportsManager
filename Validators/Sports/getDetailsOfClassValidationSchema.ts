import * as yup from 'yup';

export const getDetailsOfClassValidationSchema = yup
  .object({
    id: yup.number().required(),
  })
  .required();
