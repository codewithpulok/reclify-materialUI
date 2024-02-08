import { Stack } from '@mui/material';

import { RHFSwitch, RHFTextField } from 'src/components/common/hook-form';
import Scrollbar from 'src/components/common/scrollbar';

const Props = {};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const Fields = (props) => (
  <Scrollbar sx={{ maxHeight: 400, pt: 0.7 }}>
    <Stack spacing={1}>
      <RHFTextField name="routingNumber" type="number" label="Routing Number" />
      <RHFTextField name="accountNumber" label="Account Number" />
      <RHFTextField name="accountName" label="Name on Account" />
      <RHFSwitch name="isPrimary" label="Primary" />
    </Stack>
  </Scrollbar>
);

Fields.propTypes = Props;

export default Fields;
