import * as Yup from 'yup';

/** @type {CustomerList} */
const customerSchema = {
  image: Yup.string()
    .url()
    .label('Customer image')
    .test({
      name: 'oneOfRequired',
      message: 'Customer Image or Name at least one should provide',
      test: (value, ctx) => {
        if (!value && !ctx.parent?.name) return false;
        return true;
      },
    }),
  name: Yup.string()
    .label('Customer name')
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
  customerList: Yup.array()
    .of(Yup.object().shape(customerSchema))
    .min(1)
    .label('Customer list')
    .required(),
};
const createSchema = Yup.object().shape(schema);

export default createSchema;
