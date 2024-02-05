'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { EmailInboxIcon } from 'src/assets/icons';

import { Alert } from '@mui/material';
import { useCallback, useState } from 'react';
import FormProvider from 'src/components/common/hook-form';
import { useEmailVerifyMutation } from 'src/redux-toolkit/services/authApi';
import MailSuccess from '../common/mail-success';
import VerifyFields from './verify-fields';
import verifySchema from './verify-schema';

// ----------------------------------------------------------------------

const defaultValues = {
  email: '',
};

export default function VerifyForm() {
  // app state
  const [apiError, setApiError] = useState(null);

  // api state
  const [verifyEmail, verfiyResponse] = useEmailVerifyMutation();

  // form state
  const methods = useForm({ resolver: yupResolver(verifySchema), defaultValues });
  const { handleSubmit } = methods;

  const onSubmit = useCallback(
    async (values) => {
      // reset error state
      setApiError(null);
      console.log('Send verification mail: ', values);

      // call some api to register
      const response = await verifyEmail(values);
      const { data, error } = response;

      // handle error
      if (error || data?.isError) {
        console.error('Send verification mail Error: ', response);
        setApiError(error?.data?.message || data?.message);
      }

      // handle success
      if (data?.success) {
        console.warn('Send verification mail sent: ', response);
      }
    },
    [verifyEmail]
  );

  // success state
  if (verfiyResponse?.isSuccess && !verfiyResponse?.isLoading) {
    return <MailSuccess title="Verification Mail Sent" />;
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <EmailInboxIcon sx={{ height: 96 }} />

      <Stack spacing={1} sx={{ my: 5 }}>
        <Typography variant="h3">Email Verification!</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, quisquam commodi.
          Obcaecati doloribus ipsam, voluptates similique excepturi ipsa beatae nihil.
        </Typography>
      </Stack>

      {!!apiError && (
        <Alert severity="error" sx={{ mb: 5 }}>
          {apiError}
        </Alert>
      )}

      <VerifyFields />
    </FormProvider>
  );
}
