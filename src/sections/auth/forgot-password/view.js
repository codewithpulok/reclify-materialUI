'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { PasswordIcon } from 'src/assets/icons';

import { Alert } from '@mui/material';
import { useCallback, useState } from 'react';
import FormProvider from 'src/components/common/hook-form';
import { useForgotPasswordMutation } from 'src/redux-toolkit/services/authApi';
import MailSuccess from '../common/mail-success';
import ForgotFields from './forgot-fields';
import forgotSchema from './forgot-schema';

const defaultValues = {
  email: '',
};

// ----------------------------------------------------------------------

export default function ForgotPasswordView() {
  // app state
  const [apiError, setApiError] = useState(null);

  // api state
  const [forgotPassword, forgotResponse] = useForgotPasswordMutation();

  // form state
  const methods = useForm({ resolver: yupResolver(forgotSchema), defaultValues });

  const { handleSubmit } = methods;

  const onSubmit = useCallback(
    async (values) => {
      // reset error state
      setApiError(null);
      console.log('Forgot Password: ', values);

      // call some api to register
      const response = await forgotPassword(values);
      const { data, error } = response;

      // handle error
      if (error || data?.isError) {
        console.error('Forgot Password Error: ', response);
        setApiError(error?.data?.message || data?.message);
      }

      // handle success
      if (data?.success) {
        console.warn('Forgot Password Mail Sent: ', response);
      }
    },
    [forgotPassword]
  );

  const renderHead = (
    <>
      <PasswordIcon sx={{ height: 96 }} />

      <Stack spacing={1} sx={{ my: 5 }}>
        <Typography variant="h3">Forgot your password?</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Please enter the email address associated with your account and We will email you a link
          to reset your password.
        </Typography>
      </Stack>
    </>
  );

  // success state
  if (forgotResponse?.isSuccess && !forgotResponse?.isLoading) {
    return <MailSuccess title="Reset Mail Sent" />;
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {renderHead}

      {!!apiError && <Alert severity="error">{apiError}</Alert>}

      <ForgotFields />
    </FormProvider>
  );
}
