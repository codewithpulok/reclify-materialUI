import { Box, Stack } from '@mui/material';
import { CardElement } from '@stripe/react-stripe-js';

import { RHFSwitch, RHFTextField } from 'src/components/common/hook-form';
import Scrollbar from 'src/components/common/scrollbar';

const Props = {};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const CardFields = (props) => (
  <Scrollbar sx={{ maxHeight: 400, pt: 0.7 }}>
    <Stack spacing={1}>
      <RHFTextField name="name" label="Card Holder" />
      <Box my={1.2}>
        <CardElement />
      </Box>
      <RHFSwitch name="isPrimary" label="Primary" />
    </Stack>
  </Scrollbar>
);

CardFields.propTypes = Props;

export default CardFields;
