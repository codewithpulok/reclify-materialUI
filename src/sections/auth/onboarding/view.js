'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { PATH_AFTER_LOGIN } from 'src/config-global';
import { useLogoutMutation } from 'src/redux-toolkit/services/authApi';
import { useOnboardingMutation } from 'src/redux-toolkit/services/paymentApi';
import { paths } from 'src/routes/paths';
import OnboardingFields from './onboarding-fields';
import onboardingSchema from './onboarding-schema';

const defaultValues = {
  email: '',
  url: '',
  statementdescriptor: '',
  ip: '',
  firstName: '',
  lastName: '',
  phone: '',
  ssn: '',
  dob: Date.now(),
  address: {
    country: '',
    state: '',
    city: '',
    zipCode: '',
    street1: '',
    street2: '',
  },
  company: {
    name: '',
    address: {
      country: '',
      state: '',
      city: '',
      zipCode: '',
      street1: '',
      street2: '',
      id: '',
    },
    taxId: '',
  },
};

const OnboardingView = () => {
  // app state
  const router = useRouter();

  // api state
  const [updateOnboarding] = useOnboardingMutation();
  const [logout, logoutResponse] = useLogoutMutation();

  // form state
  const methods = useForm({ defaultValues, resolver: yupResolver(onboardingSchema) });
  const { handleSubmit, formState } = methods;
  const { isSubmitting } = formState;

  // handle submit
  const onSubmit = useCallback(
    async (values) => {
      const dob = new Date(values.dob);
      /** @type {Address} */
      const individualAddress = values.address;
      /** @type {Address} */
      const companyAddress = values.company.address;

      const structuredValues = {
        email: values.email,
        businessProfile: {
          url: values.url,
        },
        paymentSettings: {
          statementdescriptor: values.statementdescriptor,
        },
        tosAcceptance: {
          ip: values.ip,
        },
        individual: {
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          ssn: values.ssn,
          dob: {
            day: dob.getDay(),
            month: dob.getMonth(),
            year: dob.getFullYear(),
          },
          address: {
            line1: `${individualAddress.street1}, ${individualAddress.street2}`,
            postalCode: individualAddress.zipCode,
            city: individualAddress.city,
            state: individualAddress.state,
          },
        },
        company: {
          name: values.company.name,
          address: {
            line1: `${companyAddress.street1}, ${companyAddress.street2}`,
            postalCode: companyAddress.zipCode,
            city: companyAddress.city,
            state: companyAddress.state,
          },
          tax_id: values.company.taxId,
        },
      };

      console.log('Complete Onboarding', values);

      const response = await updateOnboarding(structuredValues);
      const { data, error } = response;

      // handle error state
      if (error || data.isError) {
        console.error('ERROR: Complete onboarding', response);
        enqueueSnackbar(error?.data?.message || 'Error in complete onboarding', {
          variant: 'error',
        });
      }

      // handle success state
      else if (data.success) {
        console.warn('SUCCESS: Onboarding completed', response);
        enqueueSnackbar('Successfully completed onboarding');
        router.replace(PATH_AFTER_LOGIN);
      }
    },
    [router, updateOnboarding]
  );

  // handle logout function
  const handleLogout = async () => {
    await logout();
    router.replace(paths.auth.login);
  };

  // head part
  const renderHead = (
    <Stack spacing={1} sx={{ my: 5 }}>
      <Typography variant="h3">Account Onboarding</Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos, at.
      </Typography>
    </Stack>
  );

  return (
    <Stack maxWidth={800}>
      {renderHead}

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <OnboardingFields />

        <Stack spacing={1} mt={5}>
          <LoadingButton variant="contained" color="primary" type="submit" loading={isSubmitting}>
            Complete
          </LoadingButton>
          <LoadingButton
            variant="soft"
            color="error"
            onClick={handleLogout}
            loading={logoutResponse.isLoading}
          >
            Log out
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Stack>
  );
};

export default OnboardingView;
