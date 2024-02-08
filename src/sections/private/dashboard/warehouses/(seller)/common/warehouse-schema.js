import {
  getRegionsByScope,
  predefinedApprovedUses,
  predefinedFacility,
  predefinedFeatures,
  predefinedServices,
  regionScopes,
} from 'src/assets/data';
import { getPredefinedFieldSchema } from 'src/utils/predefined-fields';
import * as Yup from 'yup';

/** @type {Warehouse} */
const schema = {
  name: Yup.string().label('Warehouse Name').required(),
  regionScope: Yup.string()
    .label('Region Scope')
    .oneOf(
      regionScopes.map((s) => s.code),
      'Invalid Region scope'
    )
    .required(),
  region: Yup.string()
    .label('Region')
    .test({
      name: 'custom-one-of',
      message: 'Region code is not valid',
      test(value, ctx) {
        return !!getRegionsByScope(ctx?.parent?.regionScope).find((i) => i.code === value);
      },
      skipAbsent: true,
    })
    .required(),
  // address: addressFieldSchema,
  totalSpace: Yup.number().label('Total space').min(1).required(),
  price1: Yup.number().label('Price for 1 month').min(0).required(),
  price3: Yup.number().label('Price for 3 month').min(0).required(),
  price6: Yup.number().label('Price for 6 month').min(0).required(),
  price12: Yup.number().label('Price for 12 month').min(0).required(),
  discountRate: Yup.number().label('Discount Rate').min(0).max(100).notRequired(),
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
  highlights: Yup.string().label('Highlight').required().max(200),
  photos: Yup.array(
    Yup.object().shape({
      id: Yup.string().required('Photo id is required'),
      title: Yup.string().required('Photo title is required'),
      link: Yup.string().required('Photo url is required'),
    })
  ),
  rules: Yup.array(Yup.string()),
  approvedUses: Yup.object().shape(getPredefinedFieldSchema(predefinedApprovedUses)),
  features: Yup.object().shape(getPredefinedFieldSchema(predefinedFeatures)),
  facilityDetails: Yup.object().shape(getPredefinedFieldSchema(predefinedFacility)),
  services: Yup.object().shape(getPredefinedFieldSchema(predefinedServices)),
};
const warehouseSchema = Yup.object().shape(schema);

export default warehouseSchema;
