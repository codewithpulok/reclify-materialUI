import * as Yup from 'yup';

/** @type {BillingAddress} */
const validationSchema = {
  // address: addressFieldSchema,
  fullName: Yup.string().label('Billing name').required(),
  phoneNumber: Yup.string().label('Billing phone number').required(),
  email: Yup.string().email().label('Billing email').required(),
  isPrimary: Yup.boolean().default(false),
};

export const billingSchema = Yup.object().shape(validationSchema);
