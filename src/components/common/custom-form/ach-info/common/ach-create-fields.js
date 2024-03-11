import { Alert, MenuItem, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { RHFSwitch, RHFTextField } from 'src/components/common/hook-form';
import Scrollbar from 'src/components/common/scrollbar';

const Props = {
  hidePrimary: PropTypes.bool,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const AchCreateFields = (props) => {
  const { hidePrimary } = props;

  const { formState } = useFormContext();
  const { errors } = formState;

  return (
    <Scrollbar sx={{ maxHeight: 400, pt: 0.7 }}>
      <Stack spacing={1}>
        {errors?.root?.message && <Alert severity="error">{errors?.root?.message}</Alert>}
        <RHFTextField name="routingNumber" label="Routing Number" />
        <RHFTextField name="accountNumber" label="Account Number" />
        <RHFTextField name="accountHolderType" label="Account Holder Type" select>
          <MenuItem value="company">Company</MenuItem>
          <MenuItem value="individual">Individual</MenuItem>
        </RHFTextField>
        <RHFTextField name="accountName" label="Name on Account" />
        <RHFTextField type="email" name="email" label="Email Address" />
        {!hidePrimary && <RHFSwitch name="isPrimary" label="Primary" />}
      </Stack>
    </Scrollbar>
  );
};

AchCreateFields.propTypes = Props;

export default AchCreateFields;
