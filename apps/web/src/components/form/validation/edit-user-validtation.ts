import * as yup from 'yup';

export const ProfileSchema = yup.object({
  name: yup.string().min(2, 'Name should be at least 2 characters').required(),
  surname: yup
    .string()
    .min(2, 'Surname should be at least 2 characters')
    .required(),
  email: yup.string().email().required(),
});
