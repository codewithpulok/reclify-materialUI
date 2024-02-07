import { card, cvc } from 'creditcards';
import * as Yup from 'yup';

/** @type {PaymentCard} */
const validationSchema = {
  cardNumber: Yup.string()
    .required('Credit card number is required')
    .test('test-number', 'Credit card number is invalid', (value) =>
      card.isValid(value, card.type(value))
    ),
  isPrimary: Yup.boolean().default(false),
  cardHolder: Yup.string().required('Credit card holder name is required'),
  expirationDate: Yup.number().required('Credit card expire date is required'),
  cvv: Yup.number()
    .required('Credit card security number is required')
    .test('test-security-number', 'Credit security number is invalid', (value) =>
      cvc.isValid(value?.toString())
    ),
};

export const paymentCardCreateSchema = Yup.object().shape(validationSchema);
