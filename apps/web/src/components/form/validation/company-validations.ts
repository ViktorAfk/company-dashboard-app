import * as yup from 'yup';

export const schema = yup.object({
  companyName: yup
    .string()
    .min(2, 'Company name should have at least 2 characters')
    .required(),
  service: yup.string().required(),
  description: yup
    .string()
    .min(50, 'Description should have at least 50 characters')
    .required(),
  capital: yup.number().required().integer().positive(),
  createdDate: yup.string().required(),
  location: yup
    .object({
      zip: yup.number().min(5).required(),
      country: yup.string().required(),
      city: yup.string().required(),
      street: yup.string().required(),
      building: yup.number().integer().positive().required(),
    })
    .required(),
});

// prices: yup.array(
//   yup
//     .object({
//       date: yup.string().required(),
//       price: yup.number().positive().required(),
//     })
//     .required(),
// ),
