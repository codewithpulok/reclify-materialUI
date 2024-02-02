import * as Yup from 'yup';

/** @type {Warehouse} */
const schema = {};
const createSchema = Yup.object().shape(schema);

export default createSchema;
