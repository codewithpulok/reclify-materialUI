import { Grid, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  getRegionByStateCode,
  getRegionScope,
  getRegionsByScope,
  regionScopes,
} from 'src/assets/data';
import { getCountryByLabel, getStateByLabel } from 'src/assets/data/address';
import {
  AddressField,
  BannerField,
  PhotosUploadField,
  SinglePhotoUploadField,
} from 'src/components/common/custom-fields';
import { RHFTextField } from 'src/components/common/hook-form';
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
  const { watch, getValues, setValue } = useFormContext();
  const regionScope = watch('regionScope', '');
  const highlights = watch('highlights', '');
  const addressCountry = watch('address.country', undefined);
  const addressState = watch('address.state', undefined);

  useEffect(() => {
    if (regionScope) {
      const region = getValues('region');
      const regions = getRegionsByScope(regionScope);
      if (regions.findIndex((r) => r.code === region) === -1) setValue('region', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regionScope]);

  useEffect(() => {
    if (addressCountry) {
      const countryCode = getCountryByLabel(addressCountry)?.code;
      if (countryCode) {
        setValue('regionScope', getRegionScope(countryCode?.toLowerCase()).code);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressCountry]);

  useEffect(() => {
    if (addressState) {
      const stateCode = getStateByLabel(addressState)?.code;
      if (stateCode) {
        setValue('region', getRegionByStateCode(stateCode).code);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressState]);

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
