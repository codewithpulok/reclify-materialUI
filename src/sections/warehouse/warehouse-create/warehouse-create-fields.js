// import PropTypes from 'prop-types'

import { Button, Grid, Stack } from '@mui/material';
import Link from 'next/link';
import { RHFTextField } from 'src/components/hook-form';
import Label from 'src/components/label';
import { WarehousePhotoUpload } from 'src/components/warehouse/upload';
import { paths } from 'src/routes/paths';

const WarehouseCreateFields = (props) => (
  <Grid container maxWidth={600} spacing={1.2}>
    <Grid item xs={12}>
      <RHFTextField name="name" label="Name" fullWidth />
    </Grid>
    <Grid item xs={12}>
      <RHFTextField name="location" label="Address" fullWidth />
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

WarehouseCreateFields.propTypes = {};

export default WarehouseCreateFields;
