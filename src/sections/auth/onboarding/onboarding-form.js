import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Alert, Stack, Typography } from '@mui/material';
import subYears from 'date-fns/subYears';
import { enqueueSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { useOnboardingMutation } from 'src/redux-toolkit/services/paymentApi';
import getIP from 'src/utils/api/client/services/getIP';
import OnboardingFields from './onboarding-fields';
import onboardingSchema from './onboarding-schema';

// ----------------------------------------------------------------------

const defaultValues = {
  email: '',
  url: '',
  statementdescriptor: '',
  firstName: '',
  lastName: '',
  phone: '',
  ssn: '',
  dob: subYears(new Date(), 13).getTime(),
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
    },
    taxId: '',
  },
  ach: undefined,
  card: undefined,
};

// ----------------------------------------------------------------------

/**
 *
 * @param {OnboardingForm.propTypes} props
 * @returns
 */
const OnboardingForm = (props) => {
  const { user } = useAppSelector(selectAuth);

  const failedMessages = useMemo(() => {
    if (user.stripeAccountStatus !== 'FAILED') return [];

    if (!Array.isArray(user?.onboardingDetails?.requirements?.errors)) return [];

    return user?.onboardingDetails?.requirements?.errors.map((e) => ({
      message: e?.reason || null,
      key: e?.requirement || null,
    }));
  }, [user?.onboardingDetails?.requirements?.errors, user.stripeAccountStatus]);

  // api state
  const [updateOnboarding] = useOnboardingMutation();

  // form state
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(onboardingSchema),
    reValidateMode: 'onChange',
  });
  const { handleSubmit, formState, setValue } = methods;
  const { isSubmitting } = formState;

  // handle submit
  const onSubmit = useCallback(
    async (values) => {
      const ipResponse = await getIP();

      // handle ip error
      if (ipResponse?.error) {
        console.error('ERROR: Getting IP', ipResponse);
        enqueueSnackbar('Error in getting IP', {
          variant: 'error',
        });
        return; // stop further execution
      }

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
          statementdescriptor: values.company.name,
        },
        tosAcceptance: {
          ip: ipResponse.data,
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
        cardToken: values?.card?.cardToken,
        achToken: values?.ach?.achToken,
      };

      console.log('Complete Onboarding', { values, structuredValues });

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
        console.warn('SUCCESS: Onboarding submitted', response);
        enqueueSnackbar('Onboarding Submitted');
      }
    },
    [updateOnboarding]
  );

  // update the email field
  useEffect(() => {
    if (user?.email) setValue('email', user?.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email]);

  // head part
  const renderHead = (
    <Stack spacing={1} sx={{ my: 5 }}>
      <Typography variant="h3">Account Onboarding</Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos, at.
      </Typography>

      {!!failedMessages?.length && (
        <Stack spacing={1}>
          {failedMessages.map((fail) => {
            if (fail.message === null && fail.key === null) return null;

            return (
              <Alert key={fail.key} severity="error">
                {fail.message || fail.key}
              </Alert>
            );
          })}
        </Stack>
      )}
    </Stack>
  );

  return (
    <Stack width="100%">
      {renderHead}

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <OnboardingFields />

        <Stack spacing={1} mt={5}>
          <LoadingButton variant="contained" color="primary" type="submit" loading={isSubmitting}>
            Complete
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Stack>
  );
};

OnboardingForm.propTypes = {};

export default OnboardingForm;
