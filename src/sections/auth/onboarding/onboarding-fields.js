import { Grid, Stack } from '@mui/material';
import { AddressField, PasswordField } from 'src/components/common/custom-fields';
import { RHFAccordion, RHFDatePicker, RHFTextField } from 'src/components/common/hook-form';
import formatPhone from 'src/utils/format-phone';
import AchField from './common/ach-field';
import CardField from './common/card-field';

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
      <RHFTextField name="statementdescriptor" label="Statement Descriptor" fullWidth />
    </Grid>

    <Grid xs={12} md={6} item>
      <RHFDatePicker
        name="dob"
        label="Date of Birth"
        slotProps={{ textField: { fullWidth: true } }}
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
