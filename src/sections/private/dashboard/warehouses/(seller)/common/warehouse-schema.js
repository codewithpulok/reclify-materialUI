import { getRegionsByScope, regionScopes } from 'src/assets/data';
import {
  predefinedAmenities,
  predefinedFacility,
  predefinedFeatures,
} from 'src/assets/data/predefined-fields/warehouse';
import { addressFieldSchema } from 'src/components/common/custom-fields';
import { getPredefinedFieldSchema } from 'src/utils/predefined-fields';
import * as Yup from 'yup';

const discountValidation = (month) =>
  Yup.number()
    .label(`Discount for ${month} month`)
    .nullable()
    .optional()
    .default(0)
    .min(0)
    .test({
      name: 'valid-discount',
      message: 'Invalid Discount',
      test(value, ctx) {
        const depended = ctx.parent?.[`price${month}`];
        const discountOption = ctx.parent?.discountOption;

        // check ignore cases
        if (!ctx.parent.hotRackEnabled || !depended || discountOption !== 'fixed' || !value)
          return true;

        const discountedPrice = depended - value;

        return discountedPrice > 0;
      },
      skipAbsent: true,
    });

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
  address: addressFieldSchema,
  additionalAddresses: Yup.array().of(addressFieldSchema),
  totalSpace: Yup.number().label('Total space').min(1).required(),
  hotRackEnabled: Yup.bool().label('HotRack Enabled').default(false),
  discountOption: Yup.string().oneOf(['fixed', 'percentage']).default('percentage').optional(),
  price1: Yup.number().label('Price for 1 month').min(0).nullable().default(0),
  price3: Yup.number().label('Price for 3 month').min(0).nullable().default(0),
  price6: Yup.number().label('Price for 6 month').min(0).nullable().default(0),
  price12: Yup.number().label('Price for 12 month').min(0).nullable().default(0),
  discount1: discountValidation(1),
  discount3: discountValidation(3),
  discount6: discountValidation(6),
  discount12: discountValidation(12),
  // discountAll: discountAllValidation(),
  discountRate: Yup.number().label('HotRacks').min(0).max(100).notRequired(),
  maxSpaceOrder: Yup.number()
    .label('Max orderable space')
    .optional()
    .required()
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
    .required()
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
  features: Yup.object()
    .shape(getPredefinedFieldSchema(predefinedFeatures))
    .test('al-least-one-feature', 'At least one feature should be checked', (obj) => {
      const keys = Object.keys(obj);

      return keys.some((k) => obj[k]);
    }),
  facilityDetails: Yup.object().shape(getPredefinedFieldSchema(predefinedFacility)),
  amenities: Yup.object().shape(getPredefinedFieldSchema(predefinedAmenities)),
};
const warehouseSchema = Yup.object().shape(schema);

export default warehouseSchema;
