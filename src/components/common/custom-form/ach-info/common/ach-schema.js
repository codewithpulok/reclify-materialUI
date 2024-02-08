import * as Yup from 'yup';

/** @type {ACHType} */
const validationSchema = {
  routingNumber: Yup.string().label('Routing Number').required(),
  accountNumber: Yup.string().label('Account Number').required(),
  accountName: Yup.string().label('Account Name').required(),
  isPrimary: Yup.bool().default(false).optional(),
};

export const AchSchema = Yup.object().shape(validationSchema);
