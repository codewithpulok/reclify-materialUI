import { serviceTypes } from 'src/constant/service-types';
import * as Yup from 'yup';

const schema = {
  firstName: Yup.string().required('First name required'),
  lastName: Yup.string().required('Last name required'),
  userType: Yup.string().label('Account Type').oneOf(['customer', 'seller']).required(),
  serviceType: Yup.string()
    .label('Service Type')
    .test({
      name: 'service-type-based-user-type',
      message: 'Service type is required',
      test(value, ctx) {
        if (ctx.parent?.userType === 'seller' && (value === undefined || value === '')) {
          return false;
        }
        return true;
      },
      skipAbsent: true,
    })
    .oneOf(serviceTypes.map((t) => t.value))
    .optional(),
  email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  password: Yup.string().required('Password is required'),
};

export const registerSchema = Yup.object().shape(schema);
