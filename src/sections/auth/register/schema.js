import * as Yup from 'yup';

const schema = {
  firstName: Yup.string().required('First name required'),
  lastName: Yup.string().required('Last name required'),
  userType: Yup.string().label('Account Type').oneOf(['customer', 'seller']).required(),
  email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  password: Yup.string().required('Password is required'),
};

export const registerSchema = Yup.object().shape(schema);
