import { addressFieldSchema } from 'src/components/common/custom-fields';
import * as Yup from 'yup';

const onboardingSchema = Yup.object().shape({
  email: Yup.string().email().label('Email').required(),
  url: Yup.string().url().label('Business URL').required(),
  firstName: Yup.string().label('First Name').required(),
  lastName: Yup.string().label('Last Name').required(),
  phone: Yup.string().label('Phone').required(),
  ssn: Yup.string().label('SSN').required(),
  dob: Yup.number().label('Date of Birth').required(),
  address: addressFieldSchema,
  company: Yup.object().shape({
    name: Yup.string().label('Company Name').required(),
    address: addressFieldSchema,
    taxId: Yup.string().label('Tax ID').required(),
  }),
});

export default onboardingSchema;
