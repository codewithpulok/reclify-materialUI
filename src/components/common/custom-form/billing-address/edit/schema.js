import * as Yup from 'yup';

import { addressFieldSchema } from 'src/components/common/fields';

/** @type {BillingAddress} */
const validationSchema = {
  address: addressFieldSchema,
  addressType: Yup.string().label('Address type').oneOf(['office', 'home']).required(),
  fullName: Yup.string().label('Billing name').required(),
  phoneNumber: Yup.string().label('Billing phone number').required(),
  primary: Yup.boolean().default(false),
};

export const billingAddressEditSchema = Yup.object().shape(validationSchema);
