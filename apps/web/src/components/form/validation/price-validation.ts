import * as yup from 'yup';

export const PriceSchema = yup
  .object({
    date: yup.string().required(),
    price: yup.number().positive().required(),
  })
  .required();
