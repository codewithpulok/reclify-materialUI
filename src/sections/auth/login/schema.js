import * as Yup from 'yup';

const schema = {
  email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  password: Yup.string().required('Password is required'),
};

export const loginSchema = Yup.object().shape(schema);
