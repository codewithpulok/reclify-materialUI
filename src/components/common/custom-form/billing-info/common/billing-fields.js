import { Stack } from '@mui/material';

import { AddressField } from 'src/components/common/custom-fields';
import { RHFSwitch, RHFTextField } from 'src/components/common/hook-form';
import Scrollbar from 'src/components/common/scrollbar';
import formatPhone from 'src/utils/format-phone';

const FieldsProps = {};

/**
 * @param {FieldsProps} props
 * @returns {JSX.Element}
 */
const BillingFields = (props) => (
  <Scrollbar sx={{ maxHeight: 400, pt: 0.7 }}>
    <Stack spacing={1}>
      <RHFTextField name="fullName" label="Full Name" />
      <RHFTextField
        name="phoneNumber"
        label="Phone Number"
        onChangeMiddleware={formatPhone}
        placeholder="000-000-0000"
      />
      <RHFTextField name="email" type="email" label="Email" />
      <AddressField name="address" />

      <RHFSwitch name="isPrimary" label="Primary" sx={{ ml: 'auto' }} />
    </Stack>
  </Scrollbar>
);

BillingFields.propTypes = FieldsProps;

export default BillingFields;
