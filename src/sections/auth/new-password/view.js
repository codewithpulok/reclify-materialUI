'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

import { SentIcon } from 'src/assets/icons';

import { Alert, Button } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import FormProvider from 'src/components/common/hook-form';
import { useResetPasswordMutation } from 'src/redux-toolkit/services/authApi';
import PasswordFields from './password-fields';
import passwordSchema from './password-schema';

// ----------------------------------------------------------------------

const defaultValues = {
  token: '',
  password: '',
  confirmPassword: '',
};

export default function NewPasswordView() {
  // url states
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  // app states
  const [apiError, setApiError] = useState(null);

  // api state
  const [resetPassword, resetResponse] = useResetPasswordMutation();

  // form states
  const methods = useForm({ resolver: yupResolver(passwordSchema), defaultValues });
  const { handleSubmit, setValue } = methods;

  const onSubmit = useCallback(
    async (values) => {
      // reset error state
      setApiError(null);
      console.log('Reset password: ', values);

      // call some api to register
      const response = await resetPassword(values);
      const { data, error } = response;

      // handle error
      if (error || data?.isError) {
        console.error('Reset password Error: ', response);
        setApiError(error?.data?.message || data?.message);
      }

      // handle success
      if (data?.success) {
        console.warn('Reset password mail sent: ', response);
      }
    },
    [resetPassword]
  );

  const renderHead = (
    <>
      <SentIcon sx={{ height: 96 }} />

      <Stack spacing={1} sx={{ my: 5 }}>
        <Typography variant="h3">Change Your Password!</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos, at.
        </Typography>
      </Stack>
    </>
  );

  useEffect(() => {
    if (token) {
      setValue('token', token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (resetResponse.isSuccess && resetResponse?.isLoading) {
    return (
      <Stack spacing={5}>
        <Alert severity="success">Password Reset Successfull</Alert>
        <Button LinkComponent={RouterLink} href={paths.auth.login}>
          Back to login
        </Button>
      </Stack>
    );
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {renderHead}

      {!!apiError && <Alert severity="error">{apiError}</Alert>}

      <PasswordFields />
    </FormProvider>
  );
}
