import * as Yup from 'yup';

const verifySchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Email must be a valid email address'),
});

export default verifySchema;
