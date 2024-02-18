import { Alert, MenuItem, Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { RHFSwitch, RHFTextField } from 'src/components/common/hook-form';
import Scrollbar from 'src/components/common/scrollbar';

const Props = {};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const AchEditFields = (props) => {
  const { formState } = useFormContext();
  const { errors } = formState;

  return (
    <Scrollbar sx={{ maxHeight: 400, pt: 0.7 }}>
      <Stack spacing={1}>
        {errors?.root?.message && (
          <Alert severity="error" sx={{ mb: 1 }}>
            {errors?.root?.message}
          </Alert>
        )}
        <RHFTextField name="accountHolderType" label="Account Holder Type" select>
          <MenuItem value="company">Company</MenuItem>
          <MenuItem value="individual">Individual</MenuItem>
        </RHFTextField>
        <RHFTextField name="accountName" label="Name on Account" />
        <RHFSwitch name="isPrimary" label="Primary" />
      </Stack>
    </Scrollbar>
  );
};

AchEditFields.propTypes = Props;

export default AchEditFields;
