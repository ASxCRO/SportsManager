import * as yup from 'yup';

export const deleteClassAppointmentValidationSchema = yup
  .object({
    id: yup.number().required(),
  })
  .required();
