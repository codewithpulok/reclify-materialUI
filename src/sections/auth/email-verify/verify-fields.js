import { LoadingButton } from '@mui/lab';
import { Link, Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { RHFTextField } from 'src/components/common/hook-form';
import Iconify from 'src/components/common/iconify';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

const VerifyFields = () => {
  const { formState } = useFormContext();
  const { isSubmitting } = formState;
  return (
    <Stack spacing={3} alignItems="center">
      <RHFTextField
        name="email"
        label="Email"
        placeholder="example@gmail.com"
        InputLabelProps={{ shrink: true }}
        fullWidth
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Send Verification Link
      </LoadingButton>

      <Link
        component={RouterLink}
        href={paths.auth.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width={16} />
        Return to sign in
      </Link>
    </Stack>
  );
};

export default VerifyFields;
