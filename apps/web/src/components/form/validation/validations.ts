import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const loginSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup
      .string()
      .matches(passwordRules, {
        message:
          'Please create a stronger password: min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit',
      })
      .required(),
  })
  .required();

export const signUpSchema = yup
  .object({
    name: yup
      .string()
      .min(2, 'Name should be at least 2 characters')
      .required(),
    surname: yup
      .string()
      .min(2, 'Surname should be at least 2 characters')
      .required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .matches(passwordRules, {
        message:
          'Please create a stronger password: min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit',
      })
      .required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Password should be equal')
      .required(),
  })
  .required();
