'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

import { PATH_AFTER_LOGIN } from 'src/config-global';

import { useCallback, useState } from 'react';
import FormProvider from 'src/components/common/hook-form';
import { useRegisterMutation } from 'src/redux-toolkit/services/authApi';
import Fields from './fields';
import { registerSchema } from './schema';

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  userType: 'customer',
  serviceType: 'warehouse',
};
// ----------------------------------------------------------------------

const RegisterView = (props) => {
  const [handleRegister] = useRegisterMutation();
  const [apiError, setApiError] = useState(null);

  const router = useRouter();

  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo') || PATH_AFTER_LOGIN;

  const methods = useForm({ resolver: yupResolver(registerSchema), defaultValues });
  const { handleSubmit, formState, resetField } = methods;
  const { isSubmitting } = formState;

  const onSubmit = useCallback(
    async (values) => {
      // reset error state
      setApiError(null);
      console.log('Register: ', values);

      // call some api to register
      const response = await handleRegister(values);
      const { data, error } = response;

      // handle error
      if (error || data?.isError) {
        console.error('Register Failed: ', error || data?.message);
        setApiError(error?.data?.message || data?.message);
        resetField('password');
      }

      // handle success
      if (data?.isSuccess) {
        console.info('Register Success: ', data);
        router.push(returnTo);
      }
    },
    [handleRegister, resetField, returnTo, router]
  );

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <Typography variant="h4">Get started absolutely free</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2"> Already have an account? </Typography>

        <Link href={paths.auth.login} component={RouterLink} variant="subtitle2">
          Sign in
        </Link>
      </Stack>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        color: 'text.secondary',
        mt: 2.5,
        typography: 'caption',
        textAlign: 'center',
      }}
    >
      {'By signing up, I agree to '}
      <Link underline="always" color="text.primary">
        Terms of Service
      </Link>
      {' and '}
      <Link underline="always" color="text.primary">
        Privacy Policy
      </Link>
      .
    </Typography>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        {!!apiError && <Alert severity="error">{apiError}</Alert>}
        <Fields />
        <LoadingButton
          fullWidth
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Create account
        </LoadingButton>
      </Stack>
    </FormProvider>
  );

  console.log({ formState });

  return (
    <>
      {renderHead}

      {renderForm}

      {renderTerms}
    </>
  );
};

RegisterView.propTypes = {};

export default RegisterView;
