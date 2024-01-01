import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
// local components
import {
  predefinedApprovedUses,
  predefinedFacility,
  predefinedFeatures,
  predefinedServices,
} from 'src/assets/data';
import {
  AddressField,
  ArrayField,
  PredefinedFields,
  PredefinedSwitchFields,
  PredefinedTextSwitchFields,
} from 'src/components/common/fields';
import { RHFTextField } from 'src/components/common/hook-form';
import Label from 'src/components/common/label';
import { WarehousePhotoUpload } from 'src/components/warehouse/upload';
import { paths } from 'src/routes/paths';

const CreateFields = (props) => (
  <Grid container spacing={1.5}>
    <Grid item xs={12} md={6}>
      <Grid container spacing={1.2}>
        <Grid item xs={12}>
          <RHFTextField name="name" label="Name" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <AddressField name="address" />
        </Grid>

        <Grid item xs={6}>
          <RHFTextField type="number" name="totalSpace" label="Space" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <RHFTextField type="number" name="pricePerSquare" label="Price Per Sqare" fullWidth />
        </Grid>

        <Grid item xs={12}>
          <RHFTextField name="description" label="Description" rows={4} multiline fullWidth />
        </Grid>

        <Grid item xs={12}>
          <Label sx={{ mb: 1 }}>Photos</Label>
          <WarehousePhotoUpload name="photos" />
        </Grid>
      </Grid>
    </Grid>

    <Grid item xs={12} md={6}>
      <Grid container spacing={1.2}>
        <Grid item xs={12}>
          <PredefinedTextSwitchFields
            name="features"
            label="Features"
            fields={predefinedFeatures}
          />
        </Grid>
        <Grid item xs={12}>
          <PredefinedSwitchFields
            name="approvedUses"
            fields={predefinedApprovedUses}
            label="Approved Uses"
          />
        </Grid>
        <Grid item xs={12}>
          <PredefinedFields
            name="facilityDetails"
            fields={predefinedFacility}
            label="Facility Details"
          />
        </Grid>
        <Grid item xs={12}>
          <PredefinedFields
            name="services"
            fields={predefinedServices}
            label="Available Services and Rates"
          />
        </Grid>
        <Grid item xs={12}>
          <ArrayField name="rules" label="Facility Rules" />
        </Grid>
      </Grid>
    </Grid>

    <Grid item xs={12} textAlign="right" mt={5}>
      <Stack
        sx={{
          flexDirection: {
            xs: 'row',
            sm: 'row-reverse',
          },
          justifyContent: {
            xs: 'start',
            sm: 'end',
          },
        }}
        flexWrap="wrap"
        spacing={0.5}
      >
        <Button variant="contained" size="large" type="submit" color="primary">
          Create Warehouse
        </Button>
        <Link href={paths.dashboard.listing}>
          <Button variant="soft" size="large" color="error" type="reset">
            Cancel
          </Button>
        </Link>
      </Stack>
    </Grid>
  </Grid>
);

CreateFields.propTypes = {};

export default CreateFields;
