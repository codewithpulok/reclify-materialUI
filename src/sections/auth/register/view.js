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
import { useAuthContext } from 'src/auth/hooks';
import FormProvider from 'src/components/common/hook-form';
import { registerApi } from 'src/utils/api';
import Fields from './fields';
import { registerSchema } from './schema';

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  region: '',
  userType: 'customer',
};
// ----------------------------------------------------------------------

const RegisterView = (props) => {
  const { login } = useAuthContext();
  const [apiError, setApiError] = useState(null);

  const router = useRouter();

  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo') || PATH_AFTER_LOGIN;

  const methods = useForm({ resolver: yupResolver(registerSchema), defaultValues });
  const { handleSubmit, formState, resetField } = methods;
  const { isSubmitting } = formState;

  const onSubmit = useCallback(
    async (data) => {
      // reset error state
      setApiError(null);
      console.log('Register: ', data);

      // call some api to register
      const response = await registerApi(data);

      // handle error
      if (response.isError) {
        console.error('Register Failed: ', response);
        setApiError(response.message);
        resetField('password');
      }

      // handle success
      if (response.isSuccess) {
        console.info('Register Success: ', response);
        await login(response.results.data, response.results.token);
        router.push(returnTo);
      }
    },
    [login, resetField, returnTo, router]
  );

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <Typography variant="h4">Get started absolutely free</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2"> Already have an account? </Typography>

        <Link href={paths.auth.jwt.login} component={RouterLink} variant="subtitle2">
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
