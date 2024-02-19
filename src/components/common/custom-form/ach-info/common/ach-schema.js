import * as Yup from 'yup';

/** @type {ACHType} */
const validationSchema = {
  routingNumber: Yup.string().label('Routing Number').required(),
  accountNumber: Yup.string().label('Account Number').required(),
  accountName: Yup.string().label('Account Name').required(),
  isPrimary: Yup.bool().default(false).optional(),
  accountHolderType: Yup.string()
    .label('Account Holder Type')
    .oneOf(['individual', 'company'])
    .required(),
  email: Yup.string().email().label('Account Email').required(),
};

export const AchSchema = Yup.object().shape(validationSchema);

/** @type {ACHType} */
const validationEditSchema = {
  accountName: Yup.string().label('Account Name').required(),
  isPrimary: Yup.bool().default(false).optional(),
  accountHolderType: Yup.string()
    .label('Account Holder Type')
    .oneOf(['individual', 'company'])
    .required(),
};

export const AchEditSchema = Yup.object().shape(validationEditSchema);
