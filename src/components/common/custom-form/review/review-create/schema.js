import * as Yup from 'yup';

const createSchema = Yup.object().shape({
  feedback: Yup.string().required('Feedback is required'),
  rating: Yup.number()
    .min(1, 'Minimum 1 star is required')
    .max(5, 'Maximum 5 star is allowed')
    .required('Rating is required'),
});

export default createSchema;
