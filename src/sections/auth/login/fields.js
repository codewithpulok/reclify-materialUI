'use client';

import Stack from '@mui/material/Stack';

import { PasswordField } from 'src/components/common/fields';
import { RHFTextField } from 'src/components/common/hook-form';

const Fields = (props) => (
  <Stack spacing={2.5}>
    <RHFTextField name="email" label="Email address" />
    <PasswordField name="password" label="Password" />
  </Stack>
);

Fields.propTypes = {};

export default Fields;
