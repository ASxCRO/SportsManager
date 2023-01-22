import * as yup from 'yup';

export const updateClassAppointmentValidationSchema = yup
  .object({
    description: yup.string().required(),
    dateStarting: yup.date().required(),
    classAppointmentId: yup.number().required(),
    classId: yup.number().required(),
  })
  .required();
