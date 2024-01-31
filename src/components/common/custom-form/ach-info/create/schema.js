import * as Yup from 'yup';

/** @type {ACHType} */
const validationSchema = {
  routingNumber: Yup.number().label('Routing Number').required(),
  accountNumber: Yup.number().label('Account Number').required(),
  accountName: Yup.string().label('Account Name').required(),
  primary: Yup.bool().default(false).optional(),
};

export const ACHInfoCreateSchema = Yup.object().shape(validationSchema);
