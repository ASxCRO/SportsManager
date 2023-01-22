import * as yup from 'yup';

export const createClassAppointmentValidationSchema = yup
  .object({
    description: yup.string().required(),
    classId: yup.number().required(),
    dateStarting: yup.date().required(),
  })
  .required();
