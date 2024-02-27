import * as Yup from 'yup';

const passwordSchema = Yup.object().shape({
  token: Yup.string().min(6, 'Code must be at least 6 characters').required('Code is required'),
  newPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
});

export default passwordSchema;
