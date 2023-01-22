import * as yup from 'yup';

export const unrollClassAppointmentValidationSchema = yup
  .object({
    classAppointmentId: yup.number().required(),
  })
  .required();
