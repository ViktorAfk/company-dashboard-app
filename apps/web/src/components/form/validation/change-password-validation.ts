const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
import * as yup from 'yup';

export const PasswordSchema = yup
  .object({
    oldPassword: yup.string().required(),

    newPassword: yup
      .string()
      .matches(passwordRules, {
        message:
          'Please create a stronger password: min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit',
      })
      .required(),
    confirmNewPassword: yup
      .string()
      .oneOf(
        [yup.ref('newPassword')],
        'Password and confirm new password should be equal',
      )
      .required(),
  })
  .required();
