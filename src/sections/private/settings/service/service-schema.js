import * as Yup from 'yup';

/** @type {CustomerList} */
const customerSchema = {
  image: Yup.string()
    .label('Client image')
    .nullable()
    .test({
      name: 'oneOfRequired',
      message: 'Customer Image or Name at least one should provide',
      test: (value, ctx) => {
        if (!value && !ctx.parent?.name) return false;
        return true;
      },
    }),
  name: Yup.string()
    .label('Client name')
    .test({
      name: 'oneOfRequired',
      message: 'Customer Image or Name at least one should provide',
      test: (value, ctx) => {
        if (!value && !ctx.parent?.image) return false;
        return true;
      },
    }),
};

/** @type {Service} */
const schema = {
  customerList: Yup.array().of(Yup.object().shape(customerSchema)).label('Client list').required(),
  keyFeatures: Yup.array().of(Yup.string()).max(3).label('Key Features'),
};
const createSchema = Yup.object().shape(schema);

export default createSchema;
