import { predefinedApprovedUses, predefinedFeatures } from 'src/assets/data';
import * as Yup from 'yup';

/** @type {Warehouse} */
const createSchemaShape = {
  name: Yup.string().required('Warehouse name is required'),
  address: Yup.object().shape({
    streetNumber: Yup.number().required('Warehouse street number is required'),
    streetAddress: Yup.string().required('Warehouse street address is required'),
    city: Yup.string().required('Warehouse city is required'),
    state: Yup.string().required('Warehouse state is required'),
    zipCode: Yup.number().required('Warehouse zip code is required'),
    country: Yup.string().required('Warehouse country is required'),
  }),
  totalSpace: Yup.number()
    .min(1, 'Must be greater than or equal 1')
    .required('Total space is required'),
  pricePerSquare: Yup.number()
    .min(1, 'Must be greater than or equal 1')
    .required('Price per square is required'),
  description: Yup.string().required('Description is required'),
  photos: Yup.array(
    Yup.object().shape({
      title: Yup.string().required('Photo title is required'),
      coverUrl: Yup.string().required('Photo url is required'),
    })
  ),
  approvedUses: Yup.object().shape(
    predefinedApprovedUses.reduce((prev, next) => {
      prev[next.key] = Yup.boolean().required(`${next.label} is required`);
      return prev;
    }, {})
  ),
  features: Yup.object().shape(
    predefinedFeatures.reduce((prev, next) => {
      prev[next.key] = Yup.boolean().required(`${next.label} is required`);
      return prev;
    }, {})
  ),
  rules: Yup.array(Yup.string()),
};
const createSchema = Yup.object().shape(createSchemaShape);

export default createSchema;
