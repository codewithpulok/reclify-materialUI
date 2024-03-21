import { Grid, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { getRegionsByScope, regionScopes } from 'src/assets/data';
import {
  AddressArrayField,
  AddressField,
  BannerField,
  PhotosUploadField,
  SinglePhotoUploadField,
} from 'src/components/common/custom-fields';
import { RHFAccordion, RHFTextField } from 'src/components/common/hook-form';
import Label from 'src/components/common/label';
import { restrictMaxLength } from 'src/utils/form';
import WarehouseReviews from '../warehouse-reviews';

/**
 * @param {Step0.propTypes} props
 * @returns {JSX.Element}
 */
const Step0 = (props) => {
  const { excludeImages } = props;

  // form state
  const { watch } = useFormContext();
  const regionScope = watch('regionScope');
  const highlights = watch('highlights', '');

  return (
    <Grid container spacing={1.2}>
      <Grid item xs={12} mb={2}>
        <BannerField photoLabel="Company Logo" photoName="miniLogo" bannerName="banner" />
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container spacing={1.2}>
          <Grid item xs={12}>
            <RHFTextField name="name" label="Name" fullWidth />
          </Grid>

          <Grid item xs={12}>
            <AddressField name="address" />
          </Grid>

          <Grid item xs={12}>
            <RHFAccordion name="additionalAddresses" label="Additional Addresses" defaultExpanded>
              <AddressArrayField name="additionalAddresses" />
            </RHFAccordion>
          </Grid>

          <Grid item xs={6} display="none">
            <RHFTextField name="regionScope" label="Region Scope" disabled fullWidth select>
              <MenuItem disabled>Select Region Scope</MenuItem>
              {regionScopes.map((option) => (
                <MenuItem key={option.code} value={option.code}>
                  {option.name}
                </MenuItem>
              ))}
            </RHFTextField>
          </Grid>
          <Grid item xs={12}>
            <RHFTextField name="region" label="Region" disabled fullWidth select>
              <MenuItem disabled>Select Region</MenuItem>
              {getRegionsByScope(regionScope).map((option) => (
                <MenuItem key={option.code} value={option.code}>
                  {option.name}
                </MenuItem>
              ))}
            </RHFTextField>
          </Grid>

          <Grid item xs={12}>
            <RHFTextField
              name="description"
              label="Description"
              rows={4}
              helperText="Add a short description about your business."
              multiline
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <RHFTextField
              name="highlights"
              label="Highlights"
              placeholder="Multi-Facility 3PL operating since 1983.  Looking for apparel brands requiring high SKU count and custom boutique packaging."
              helperText={`${200 - (highlights?.length || 0)} character left for highlights`}
              onChangeMiddleware={restrictMaxLength(200)}
              rows={4}
              multiline
              fullWidth
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container spacing={1.2}>
          <Grid item xs={12}>
            <SinglePhotoUploadField fieldName="logo" label="Logo" />
          </Grid>
          <Grid item xs={12}>
            <WarehouseReviews />
          </Grid>

          <Grid item xs={12}>
            <Label sx={{ mb: 1 }}>Photos</Label>
            <PhotosUploadField name="photos" excludeImages={excludeImages} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

Step0.propTypes = {
  excludeImages: PropTypes.arrayOf(PropTypes.string),
};

export default Step0;
