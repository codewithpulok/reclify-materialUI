// import PropTypes from 'prop-types'

import { Button, Grid } from '@mui/material';
import { RHFTextField } from 'src/components/hook-form';
import Label from 'src/components/label';
import WarehouseCreatePhotos from './warehouse-create-photos';

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
      <WarehouseCreatePhotos />
    </Grid>

    <Grid item xs={12} textAlign="right" mt={5}>
      <Button variant="contained" size="large" type="submit" color="primary">
        Save Changes
      </Button>
    </Grid>
  </Grid>
);

WarehouseCreateFields.propTypes = {};

export default WarehouseCreateFields;
