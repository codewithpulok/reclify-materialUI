import * as Yup from 'yup';

/** @type {Address} */
const schema = {
  streetNumber: Yup.number().label('Street number').required(),
  streetAddress: Yup.string().label('Street address').required(),
  city: Yup.string().label('City').required(),
  state: Yup.string().label('State').required(),
  zipCode: Yup.number().label('Zip code').required(),
  country: Yup.string().label('Country').required(),
};

export const addressFieldSchema = Yup.object().shape(schema);
