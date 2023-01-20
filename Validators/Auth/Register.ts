import * as yup from 'yup';

const PASSWORD_REGEX = /^[a-zA-Z0-9]{8,}$/;

export const registerValidationSchema = yup
  .object({
    email: yup.string().required().email(),
    name: yup.string().required(),
    password: yup
      .string()
      .matches(
        PASSWORD_REGEX,
        'password must contain only letters and numbers with a minimum of 8 characters'
      ),
  })
  .required();
