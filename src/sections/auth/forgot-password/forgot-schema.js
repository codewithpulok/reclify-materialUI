import * as Yup from 'yup';

const forgotSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Email must be a valid email address'),
});

export default forgotSchema;
