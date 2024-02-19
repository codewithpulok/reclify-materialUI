import * as Yup from 'yup';

/** @type {ACHType} */
const validationSchema = {
  paymentType: Yup.string().oneOf(['ACH', 'CARD']).label('Payment Type').required(),
};

export const PurchaseSchema = Yup.object().shape(validationSchema);
