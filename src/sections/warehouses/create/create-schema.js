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
