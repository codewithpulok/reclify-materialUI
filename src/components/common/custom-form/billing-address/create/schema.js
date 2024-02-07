import * as Yup from 'yup';

import { addressFieldSchema } from 'src/components/common/custom-fields';

/** @type {BillingAddress} */
const validationSchema = {
  address: addressFieldSchema,
  addressType: Yup.string().label('Address type').oneOf(['office', 'home']).required(),
  fullName: Yup.string().label('Billing name').required(),
  phoneNumber: Yup.string().label('Billing phone number').required(),
  email: Yup.string().email().label('Billing email').required(),
  isPrimary: Yup.boolean().default(false),
};

export const billingAddressCreateSchema = Yup.object().shape(validationSchema);
