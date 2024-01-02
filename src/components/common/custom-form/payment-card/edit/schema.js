import { card, cvc } from 'creditcards';
import * as Yup from 'yup';

/** @type {PaymentCard} */
const validationSchema = {
  number: Yup.string()
    .required('Credit card number is required')
    .test('test-number', 'Credit card number is invalid', (value) =>
      card.isValid(value, card.type(value))
    ),
  primary: Yup.boolean(),
  holder: Yup.string().required('Credit card holder name is required'),
  expire: Yup.number().required('Credit card expire date is required'),
  securityNumber: Yup.string()
    .required('Credit card security number is required')
    .test('test-security-number', 'Credit security number is invalid', (value) =>
      cvc.isValid(value)
    ),
};

export const paymentCardEditSchema = Yup.object().shape(validationSchema);
