import { Grid, Stack } from '@mui/material';
import subYears from 'date-fns/subYears';
import { AddressField, PasswordField } from 'src/components/common/custom-fields';
import { RHFAccordion, RHFDatePicker, RHFTextField } from 'src/components/common/hook-form';
import formatPhone from 'src/utils/format-phone';
import AchField from './common/ach-field';
import CardField from './common/card-field';

/**
 * according to the stripe docs DOB must be between 13 and 120 years old
 * https://docs.stripe.com/connect/required-verification-information#US+US+custom+full+individual+card_payments,tax_reporting_us_1099_k,transfers
 */
const minDate = subYears(new Date(), 120);
const maxDate = subYears(new Date(), 13);

const OnboardingFields = () => (
  <Grid container spacing={1}>
    <Grid xs={12} md={6} item>
      <RHFTextField name="email" label="Email" fullWidth />
    </Grid>
    <Grid xs={12} md={6} item>
      <RHFTextField name="url" label="Business URL" fullWidth />
    </Grid>

    <Grid xs={12} md={6} item>
      <RHFTextField name="firstName" label="First Name" fullWidth />
    </Grid>

    <Grid xs={12} md={6} item>
      <RHFTextField name="lastName" label="Last Name" fullWidth />
    </Grid>

    <Grid xs={12} md={6} item>
      <RHFTextField
        name="phone"
        label="Phone"
        onChangeMiddleware={formatPhone}
        placeholder="000-000-0000"
        fullWidth
      />
    </Grid>

    <Grid xs={12} md={6} item>
      <PasswordField name="ssn" label="SSN" fullWidth />
    </Grid>

    <Grid xs={12} md={6} item>
      <RHFDatePicker
        name="dob"
        label="Date of Birth"
        slotProps={{ textField: { fullWidth: true } }}
        maxDate={maxDate}
        minDate={minDate}
      />
    </Grid>

    <Grid xs={12} item>
      <AddressField name="address" />
    </Grid>

    <Grid xs={12} md={6} item>
      <AchField />
    </Grid>

    <Grid xs={12} md={6} item>
      <CardField />
    </Grid>

    <Grid xs={12} item>
      <RHFAccordion name="company" label="Company" defaultExpanded>
        <Stack spacing={0.8}>
          <RHFTextField name="company.name" label="Name" fullWidth />
          <AddressField name="company.address" fullWidth />
          <RHFTextField name="company.taxId" label="Tax ID" fullWidth />
        </Stack>
      </RHFAccordion>
    </Grid>
  </Grid>
);

export default OnboardingFields;
