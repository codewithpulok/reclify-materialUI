import * as Yup from 'yup';

/** @type {PaymentCard} */
const validationSchema = {
  isPrimary: Yup.boolean().default(false),
  name: Yup.string().required('Card holder name is required'),
};

export const cardSchema = Yup.object().shape(validationSchema);
