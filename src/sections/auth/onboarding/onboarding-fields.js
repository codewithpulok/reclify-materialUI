import { Grid, Stack } from '@mui/material';
import { AddressField } from 'src/components/common/custom-fields';
import { RHFAccordion, RHFDatePicker, RHFTextField } from 'src/components/common/hook-form';

const OnboardingFields = () => (
  <Grid container spacing={1}>
    <Grid xs={12} md={6} item>
      <RHFTextField name="email" label="Email" fullWidth />
    </Grid>
    <Grid xs={12} md={6} item>
      <RHFTextField name="url" label="Business URL" fullWidth />
    </Grid>

    <Grid xs={12} md={6} item>
      <RHFTextField name="statementdescriptor" label="Statement Descriptor" fullWidth />
    </Grid>

    <Grid xs={12} md={6} item>
      <RHFTextField name="ip" label="TOS Acceptance IP" fullWidth />
    </Grid>

    <Grid xs={12} md={6} item>
      <RHFTextField name="firstName" label="First Name" fullWidth />
    </Grid>

    <Grid xs={12} md={6} item>
      <RHFTextField name="lastName" label="Last Name" fullWidth />
    </Grid>

    <Grid xs={12} md={6} item>
      <RHFTextField name="phone" label="Phone" fullWidth />
    </Grid>

    <Grid xs={12} md={6} item>
      <RHFTextField name="ssn" label="SSN" fullWidth />
    </Grid>

    <Grid xs={12} md={6} item>
      <RHFDatePicker
        name="dob"
        label="Date of Birth"
        slotProps={{ textField: { fullWidth: true } }}
      />
    </Grid>
    <Grid xs={12} md={6} item>
      <AddressField name="address" />
    </Grid>
    <Grid item>
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
