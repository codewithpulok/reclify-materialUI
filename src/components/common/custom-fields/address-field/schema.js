import * as Yup from 'yup';

/** @type {Address} */
const schema = {
  street1: Yup.string().label('Street address').optional(),
  street2: Yup.string().label('Street number').optional(),
  city: Yup.string().label('City').required(),
  state: Yup.string().label('State').required(),
  zipCode: Yup.string().label('Zip code').required(),
  country: Yup.string().label('Country').required(),
};

export const addressFieldSchema = Yup.object().shape(schema);

const optionalSchema = {
  street1: Yup.string().label('Street address').optional(),
  street2: Yup.string().label('Street number').optional(),
  city: Yup.string().label('City').optional(),
  state: Yup.string().label('State').optional(),
  zipCode: Yup.string().label('Zip code').optional(),
  country: Yup.string().label('Country').optional(),
};

export const optionalAddressFieldSchema = Yup.object().shape(optionalSchema).optional();
