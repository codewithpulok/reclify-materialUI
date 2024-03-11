'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useState } from 'react';
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

import FormProvider from 'src/components/common/hook-form';

import { useLoginMutation } from 'src/redux-toolkit/services/authApi';
import Fields from './fields';
import { loginSchema } from './schema';

const defaultValues = {
  email: 'seller@test.com',
  password: 'test123',
};
// ----------------------------------------------------------------------

export default function LoginView() {
  const router = useRouter();
  const [handleLogin] = useLoginMutation();

  const [apiError, setApiError] = useState('');

  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo') || PATH_AFTER_LOGIN;

  const methods = useForm({ resolver: yupResolver(loginSchema), defaultValues });

  const { resetField, handleSubmit, formState } = methods;
  const { isSubmitting } = formState;

  const onSubmit = useCallback(
    async (values) => {
      // reset error state
      setApiError(null);
      console.log('Login: ', values);

      // call some api to register
      const response = await handleLogin(values);
      const { data, error } = response;

      // handle error
      if (error || data?.isError) {
        console.error('Login Failed: ', error || data?.message);
        setApiError(error?.data?.message || data?.message);
        resetField('password');
      }

      // handle success
      if (data?.success) {
        console.warn('Login Success: ', data);
        router.push(returnTo);
      }
    },
    [handleLogin, resetField, returnTo, router]
  );

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Sign in to Racklify</Typography>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!apiError && <Alert severity="error">{apiError}</Alert>}

      <Fields />

      <Link
        variant="body2"
        component={RouterLink}
        href={paths.auth.forgot_password}
        color="inherit"
        underline="always"
        sx={{ alignSelf: 'flex-end' }}
      >
        Forgot password?
      </Link>

      <LoadingButton
        fullWidth
        color="primary"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {renderHead}
      {renderForm}
    </FormProvider>
  );
}
