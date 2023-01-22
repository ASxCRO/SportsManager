import * as yup from 'yup';

export const enrollToClassAppointmentValidationSchema = yup
  .object({
    classAppointmentId: yup.number().required(),
  })
  .required();
