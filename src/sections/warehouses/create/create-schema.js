import {
  predefinedApprovedUses,
  predefinedFacility,
  predefinedFeatures,
  predefinedServices,
  regions,
} from 'src/assets/data';
import { getPredefinedFieldSchema } from 'src/utils/predefined-fields';
import * as Yup from 'yup';

/** @type {Warehouse} */
const schema = {
  name: Yup.string().label('Warehouse Name').required(),
  region: Yup.string()
    .label('Region')
    .oneOf(
      regions.map((r) => r.code),
      'Region code is not valid'
    )
    .required(),
  // address: addressFieldSchema,
  totalSpace: Yup.number().label('Total space').min(1).required(),
  pricePerSpace: Yup.number().label('Price per space').min(1).required(),
  discountRate: Yup.number().label('Discount Rate').min(0).max(100).required().default(0),
  maxSpaceOrder: Yup.number()
    .label('Max orderable space')
    .optional()
    .default(undefined)
    .test({
      name: 'bigger-then-min-space',
      message: 'Should be bigger then minimum space',
      test(value, ctx) {
        if (typeof ctx.parent?.minSpaceOrder === 'number' && typeof value === 'number') {
          return value > ctx.parent.minSpaceOrder;
        }
        return true;
      },
      skipAbsent: true,
    })
    .test({
      name: 'less-then-total-space',
      message: 'Should be less then or equal to total space',
      test(value, ctx) {
        if (typeof ctx.parent?.totalSpace === 'number' && typeof value === 'number') {
          return value <= ctx.parent.totalSpace;
        }
        return true;
      },
      skipAbsent: true,
    }),
  minSpaceOrder: Yup.number()
    .label('Min orderable space')
    .optional()
    .default(undefined)
    .test({
      name: 'less-then-max-space',
      message: 'Should be less then maximum space',
      test(value, ctx) {
        if (typeof ctx.parent?.maxSpaceOrder === 'number' && typeof value === 'number') {
          return value < ctx.parent.maxSpaceOrder;
        }
        return true;
      },
      skipAbsent: true,
    })
    .test({
      name: 'less-then-total-space',
      message: 'Should be less then or equal to total space',
      test(value, ctx) {
        if (typeof ctx.parent?.totalSpace === 'number' && typeof value === 'number') {
          return value <= ctx.parent.totalSpace;
        }
        return true;
      },
      skipAbsent: true,
    }),
  description: Yup.string().required('Description is required'),
  photos: Yup.array(
    Yup.object().shape({
      title: Yup.string().required('Photo title is required'),
      coverUrl: Yup.string().required('Photo url is required'),
    })
  ),
  rules: Yup.array(Yup.string()),
  approvedUses: getPredefinedFieldSchema(predefinedApprovedUses),
  features: getPredefinedFieldSchema(predefinedFeatures),
  facilityDetails: getPredefinedFieldSchema(predefinedFacility),
  services: getPredefinedFieldSchema(predefinedServices),
};
const createSchema = Yup.object().shape(schema);

export default createSchema;
