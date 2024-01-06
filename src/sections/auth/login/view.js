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

import { useAuthContext } from 'src/auth/hooks';
import { PATH_AFTER_LOGIN } from 'src/config-global';

import FormProvider from 'src/components/common/hook-form';
import { loginApi } from 'src/utils/api';
import Fields from './fields';
import { loginSchema } from './schema';

const defaultValues = {
  email: 'warehouseA@test.com',
  password: 'test123',
};
// ----------------------------------------------------------------------

export default function LoginView() {
  const { login } = useAuthContext();
  const router = useRouter();

  const [apiError, setApiError] = useState('');

  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo') || PATH_AFTER_LOGIN;

  const methods = useForm({ resolver: yupResolver(loginSchema), defaultValues });

  const { resetField, handleSubmit, formState } = methods;
  const { isSubmitting } = formState;

  const onSubmit = useCallback(
    async (data) => {
      // reset error state
      setApiError(null);
      console.log('Login: ', data);

      // call some api to register
      const response = await loginApi(data);

      // handle error
      if (response.isError) {
        console.error('Login Failed: ', response);
        setApiError(response.message);
        resetField('password');
      }

      // handle success
      if (response.isSuccess) {
        console.info('Login Success: ', response);
        await login(response.results.data, response.results.token);
        router.push(returnTo);
      }
    },
    [login, resetField, returnTo, router]
  );

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Sign in to Racklify</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">New user?</Typography>

        <Link component={RouterLink} href={paths.auth.jwt.register} variant="subtitle2">
          Create an account
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm =
    ({
      id: '3',
      email: 'customerA@test.com',
      firstName: 'Customer',
      lastName: 'User',
      role: 'customer',
    },
    (
      <Stack spacing={2.5}>
        {!!apiError && <Alert severity="error">{apiError}</Alert>}

        <Fields />

        <Link variant="body2" color="inherit" underline="always" sx={{ alignSelf: 'flex-end' }}>
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
    ));

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {renderHead}
      {renderForm}
    </FormProvider>
  );
}
