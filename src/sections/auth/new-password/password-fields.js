import { LoadingButton } from '@mui/lab';
import { Alert, IconButton, InputAdornment, Link, Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { RHFTextField } from 'src/components/common/hook-form';
import Iconify from 'src/components/common/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

const PasswordFields = (props) => {
  // app states
  const password = useBoolean();

  // form states
  const { formState, watch } = useFormContext();
  const { isSubmitting } = formState;
  const token = watch('token');

  return (
    <Stack spacing={1} alignItems="center">
      {!token && (
        <Alert sx={{ width: 1, mb: 2 }} severity="error">
          Invalid password reset token
        </Alert>
      )}

      <RHFTextField
        name="newPassword"
        label="Password"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        fullWidth
      />

      <RHFTextField
        name="confirmPassword"
        label="Confirm New Password"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        fullWidth
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        disabled={!token}
        sx={{ mt: 1 }}
      >
        Update Password
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

PasswordFields.propTypes = {};

export default PasswordFields;
