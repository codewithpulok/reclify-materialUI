import * as Yup from 'yup';

const passwordSchema = Yup.object().shape({
  code: Yup.string().min(6, 'Code must be at least 6 characters').required('Code is required'),
  email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

export default passwordSchema;
