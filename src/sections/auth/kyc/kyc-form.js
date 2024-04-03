'use client';

import { Button, Grid, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { RHFTextField, RHFUpload } from 'src/components/common/hook-form';
import FormProvider from 'src/components/common/hook-form/form-provider';
import Label from 'src/components/common/label';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';

const KYCForm = (props) => {
  const { user } = useAppSelector(selectAuth);
  const router = useRouter();

  // form states
  const defaultValues = useMemo(
    () => ({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: '',
    }),
    [user?.email, user?.firstName, user?.lastName]
  );
  const methods = useForm({ defaultValues });
  const { handleSubmit, setValue } = methods;

  // actions
  const onSubmit = (values) => {
    console.log({ values });
  };

  const handlePreview = (file, fieldName) => {
    const newFile = {
      file,
      preview: URL.createObjectURL(file),
    };

    setValue(fieldName, newFile, { shouldValidate: false });

    return newFile;
  };

  const handleFrontUpload = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;
    handlePreview(file, 'front');
  };

  const handleBackUpload = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;
    handlePreview(file, 'back');
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container mt={7} spacing={1}>
        <Grid item xs={12} md={6}>
          <RHFTextField name="firstName" label="First Name" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFTextField name="lastName" label="Last Name" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFTextField name="email" label="Email" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFTextField name="phone" label="Phone" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack alignItems="start" spacing={1}>
            <Label>ID Front Side</Label>
            <RHFUpload name="front" placeholderIllustration={false} onDrop={handleFrontUpload} />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack alignItems="start" spacing={1}>
            <Label>ID Back Side</Label>
            <RHFUpload name="back" placeholderIllustration={false} onDrop={handleBackUpload} />
          </Stack>
        </Grid>

        <Grid item xs={12} mt={5}>
          <Button variant="contained" color="primary" size="large">
            Submit Information
          </Button>
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} mt={1}>
            <Typography>Something went to wrong?</Typography>
            <Button variant="soft" color="error" onClick={router.back}>
              Go Back
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

KYCForm.propTypes = {};

export default KYCForm;
