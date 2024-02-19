import * as Yup from 'yup';

/** @type {PaymentCard} */
const validationSchema = {
  isPrimary: Yup.boolean().default(false),
  cardHolder: Yup.string().required('Card holder name is required'),
};

export const cardSchema = Yup.object().shape(validationSchema);

/** @type {PaymentCard} */
const editValidationSchema = {
  isPrimary: Yup.boolean().default(false),
  cardHolder: Yup.string().required('Card holder name is required'),
  expirationMonth: Yup.number().label('Expire Month').required(),
  expirationYear: Yup.number().label('Expire Year').required(),
};

export const cardEditSchema = Yup.object().shape(editValidationSchema);
