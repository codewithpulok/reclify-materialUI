import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/common/iconify';

import { RHFTextField } from 'src/components/common/hook-form';

const Fields = (props) => {
  const password = useBoolean();
  return (
    <Stack component={Card} spacing={3}>
      <RHFTextField
        name="currentPassword"
        type={password.value ? 'text' : 'password'}
        label="Current Password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <RHFTextField
        name="newPassword"
        label="New Password"
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
        helperText={
          <Stack component="span" direction="row" alignItems="center">
            <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} /> Password must be minimum 6+
          </Stack>
        }
      />

      <RHFTextField
        name="confirmNewPassword"
        type={password.value ? 'text' : 'password'}
        label="Confirm New Password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
};

Fields.propTypes = {};

export default Fields;
