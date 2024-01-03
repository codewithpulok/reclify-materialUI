import { predefinedApprovedUses, predefinedFeatures } from 'src/assets/data';
import { addressFieldSchema } from 'src/components/common/fields';
import * as Yup from 'yup';

/** @type {Warehouse} */
const schema = {
  name: Yup.string().required('Warehouse name is required'),
  address: addressFieldSchema,
  totalSpace: Yup.number().label('Total space').min(1).required(),
  pricePerSpace: Yup.number().label('Price per space').min(1).required(),
  discountRate: Yup.number().label('Discount Rate').min(0).max(100).required().default(0),
  maxSpaceOrder: Yup.number().label('Max orderable space').required(),
  minSpaceOrder: Yup.number().label('Min orderable space').required(),
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
const createSchema = Yup.object().shape(schema);

export default createSchema;
