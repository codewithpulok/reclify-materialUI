import { Alert, InputAdornment, MenuItem, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
// local components
import PropTypes from 'prop-types';
import {
  getRegionByStateCode,
  getRegionScope,
  getRegionsByScope,
  regionScopes,
} from 'src/assets/data';
import { getCountryByLabel, getStateByLabel } from 'src/assets/data/address';
import {
  predefinedAmenities,
  predefinedFacility,
  predefinedFeatures,
} from 'src/assets/data/predefined-fields/warehouse';
import {
  AddressArrayField,
  AddressField,
  BannerField,
  DocumentsUploadField,
  PhotosUploadField,
  PredefinedFields,
  ReferenceTextField,
} from 'src/components/common/custom-fields';
import { EmptyState } from 'src/components/common/custom-state';
import { RHFAccordion, RHFSwitch, RHFTextField } from 'src/components/common/hook-form';
import Label from 'src/components/common/label';
import { SQUARE_FEET_PER_PALLET } from 'src/constant/pallet';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { restrictMaxLength, restrictNegetiveValue, restrictPercentValue } from 'src/utils/form';
import { fCurrency, fFixedFloat } from 'src/utils/format-number';
import WarehouseReviews from './warehouse-reviews';

export const stepFields = {
  0: [
    'name',
    'address',
    'regionScope',
    'region',
    'description',
    'highlights',
    'photos',
    'services',
  ],
  1: ['features', 'amenities', 'facilityDetails', 'documents'],
  2: [
    'totalSpace',
    'minSpaceOrder',
    'maxSpaceOrder',
    'price1',
    'price3',
    'price6',
    'price12',
    'discountRate',
  ],
};

const Props = {
  activeStep: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  excludeImages: PropTypes.arrayOf(PropTypes.string),
};

const WarehouseFields = (props) => {
  const { activeStep = 'CREATE', excludeImages = [] } = props;
  const { user } = useAppSelector(selectAuth);

  // form state
  const { watch, getValues, resetField, setValue, setFocus } = useFormContext();
  const regionScope = watch('regionScope');
  const addressCountry = watch('address.country', undefined);
  const addressState = watch('address.state', undefined);
  const highlights = watch('highlights', '');
  const hasPromo = watch('hasPromo', false);
  const hotRackEnabled = watch('hotRackEnabled', false);
  const discountOption = watch('discountOption', 'percentage');

  const price1 = watch('price1');
  const price3 = watch('price3');
  const price6 = watch('price6');
  const price12 = watch('price12');

  const discount1 = watch('discount1');
  const discount3 = watch('discount3');
  const discount6 = watch('discount6');
  const discount12 = watch('discount12');
  const discountAll = watch('discountAll');

  const monthlyDiscount = useCallback(
    (price, discount) => {
      if (!price) return 0;
      return price - (discount || 0) - (discountAll || 0);
    },
    [discountAll]
  );

  useEffect(() => {
    if (!price1) {
      setValue('discount1', 0);
    }

    if (!price3) {
      setValue('discount3', 0);
    }

    if (!price6) {
      setValue('discount6', 0);
    }

    if (!price12) {
      setValue('discount12', 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price1, price12, price3, price6]);

  useEffect(() => {
    if (regionScope) {
      const region = getValues('region');
      const regions = getRegionsByScope(regionScope);
      if (regions.findIndex((r) => r.code === region) === -1) resetField('region');
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

  // reset promo code on hasPromo change
  useEffect(() => {
    if (hasPromo === false) {
      setValue('promoCode', '');
    }

    if (hasPromo === true) {
      setFocus('promoCode');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPromo]);

  const step0 = (
    <Grid container spacing={1.2}>
      <Grid item xs={12} mb={2}>
        <BannerField photoLabel="Company Logo" photoName="logo" bannerName="banner" />
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

  const step1 = (
    <Grid container spacing={1.2}>
      <Grid item xs={12} md={6}>
        <Grid container spacing={1.2}>
          <Grid item xs={12}>
            <PredefinedFields
              name="features"
              fields={predefinedFeatures}
              label="Features"
              defaultExpanded
              showIcon
            />
          </Grid>
          <Grid item xs={12}>
            <PredefinedFields
              name="facilityDetails"
              fields={predefinedFacility}
              label="Facility Details"
              defaultExpanded
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container spacing={1.2}>
          <Grid item xs={12}>
            <PredefinedFields
              name="amenities"
              fields={predefinedAmenities}
              label="Amenities"
              defaultExpanded
            />
          </Grid>
          <Grid item xs={12}>
            <Label sx={{ mb: 1 }}>Warehouse Documents</Label>
            <DocumentsUploadField name="documents" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  const step2 = (
    <Grid container spacing={1.2}>
      <Grid item xs={12} md={6}>
        <Grid container spacing={1.2}>
          <Grid item xs={12}>
            <RHFTextField
              valueFormatter={(v) => Math.round(v)}
              type="number"
              name="totalSpace"
              label="Total space available (Pallets)"
              onChangeMiddleware={restrictNegetiveValue}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <ReferenceTextField
              type="number"
              name="totalSpace"
              label="Total space available (Square Feet)"
              fullWidth
              srcTransformer={(v) =>
                v === null ? '' : parseFloat(fFixedFloat(v * SQUARE_FEET_PER_PALLET))
              }
              valueTransformer={(v) => (v === '' ? null : v / SQUARE_FEET_PER_PALLET)}
              onChangeMiddleware={restrictNegetiveValue}
            />
          </Grid>
          <Grid item xs={6}>
            <RHFTextField
              type="number"
              name="minSpaceOrder"
              label="Minimum space available (Pallets)"
              onChangeMiddleware={restrictNegetiveValue}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <RHFTextField
              type="number"
              name="maxSpaceOrder"
              label="Maximum space available (Pallets)"
              onChangeMiddleware={restrictNegetiveValue}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <RHFAccordion
              label="Warehouse Prices (Per Pallet)"
              names={['price1', 'price3', 'price6', 'price12']}
              defaultExpanded
            >
              <Alert sx={{ mb: 2 }} icon={false} severity="info">
                {`Enter the price per month for each pallet location, based on the term. Leave empty or enter 0 if you don't want to offer a specific term.`}
              </Alert>
              <Grid container spacing={1.2}>
                <Grid item xs={12}>
                  <RHFTextField
                    type="number"
                    name="price1"
                    label="1 Month"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    onChangeMiddleware={restrictNegetiveValue}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <RHFTextField
                    type="number"
                    name="price3"
                    label="3 Month"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    onChangeMiddleware={restrictNegetiveValue}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <RHFTextField
                    type="number"
                    name="price6"
                    label="6 Month"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    onChangeMiddleware={restrictNegetiveValue}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <RHFTextField
                    type="number"
                    name="price12"
                    label="12 Month"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    onChangeMiddleware={restrictNegetiveValue}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </RHFAccordion>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container spacing={1.2}>
          <Grid item xs={12}>
            <RHFAccordion
              names={[
                'promoCode',
                'discountRate',
                'hasPromo',
                'discount1',
                'discount3',
                'discount6',
                'discount12',
                'discountAll',
              ]}
              label="HotRack"
              defaultExpanded
              sx={{
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: 'secondary.main',
              }}
              action={
                user?.planId !== 'free' && (
                  <RHFSwitch
                    name="hotRackEnabled"
                    onClick={(e) => e.stopPropagation()}
                    size="small"
                  />
                )
              }
            >
              {user?.planId === 'free' ? (
                <Alert sx={{ mb: 2 }} icon={false} severity="warning">
                  You need to upgrade to a paid membership to add discount
                </Alert>
              ) : (
                <>
                  <Alert sx={{ mb: 2 }} icon={false} severity="secondary">
                    {`A "HotRack" refers to a time-limited discounted offer on palletized storage space. When our partners find themselves with surplus available space, they have the opportunity to list this space at a discounted rate and be prominently featured on Racklify. This dynamic approach creates a mutually beneficial scenario for both the warehouse and the customer. Warehouses gain the advantage of filling up available space quickly, while customers benefit from exclusive discounts on palletized storage, resulting in a win-win situation for all parties involved. Keep an eye out for these HotRack offers as they present an excellent opportunity to secure storage space at a compelling rate.`}
                  </Alert>
                  <Grid container spacing={1.2}>
                    <Grid item xs={12}>
                      <RHFTextField
                        name="discountOption"
                        label="Discount Option"
                        fullWidth
                        select
                        disabled={!hotRackEnabled}
                      >
                        <MenuItem disabled>Select Discount Option</MenuItem>
                        <MenuItem value="fixed">Fixed</MenuItem>
                        <MenuItem value="percentage">Percentage</MenuItem>
                      </RHFTextField>
                    </Grid>
                    {discountOption === 'percentage' && (
                      <Grid item xs={12}>
                        <RHFTextField
                          type="number"
                          name="discountRate"
                          label="Discount Rate"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">%</InputAdornment>,
                          }}
                          onChangeMiddleware={restrictPercentValue}
                          fullWidth
                          disabled={!hotRackEnabled || user?.planId === 'free'}
                        />
                      </Grid>
                    )}
                    {discountOption === 'fixed' && (
                      <>
                        <Grid item xs={12} md={6}>
                          <RHFTextField
                            type="number"
                            name="discount1"
                            label="Discount for 1 Month"
                            InputProps={{
                              startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            onChangeMiddleware={restrictNegetiveValue}
                            fullWidth
                            disabled={!hotRackEnabled || !price1}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            label="Discounted Price 1 Month"
                            value={fCurrency(monthlyDiscount(price1, discount1))}
                            error={monthlyDiscount(price1, discount1) < 1}
                            fullWidth
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <RHFTextField
                            type="number"
                            name="discount3"
                            label="Discount for 3 Month"
                            InputProps={{
                              startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            onChangeMiddleware={restrictNegetiveValue}
                            fullWidth
                            disabled={!hotRackEnabled || !price3}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            label="Discounted Price 3 Month"
                            value={fCurrency(monthlyDiscount(price3, discount3))}
                            error={monthlyDiscount(price3, discount3) < 1}
                            fullWidth
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <RHFTextField
                            type="number"
                            name="discount6"
                            label="Discount for 6 Month"
                            InputProps={{
                              startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            onChangeMiddleware={restrictNegetiveValue}
                            fullWidth
                            disabled={!hotRackEnabled || !price6}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            label="Discounted Price 6 Month"
                            value={fCurrency(monthlyDiscount(price6, discount6))}
                            error={monthlyDiscount(price6, discount6) < 1}
                            fullWidth
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <RHFTextField
                            type="number"
                            name="discount12"
                            label="Discount for 12 Month"
                            InputProps={{
                              startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            onChangeMiddleware={restrictNegetiveValue}
                            fullWidth
                            disabled={!hotRackEnabled || !price12}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            label="Discounted Price 12 Month"
                            value={fCurrency(monthlyDiscount(price12, discount12))}
                            error={monthlyDiscount(price12, discount12) < 1}
                            fullWidth
                            disabled
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <RHFTextField
                            type="number"
                            name="discountAll"
                            label="Discount for all month"
                            InputProps={{
                              startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            onChangeMiddleware={restrictNegetiveValue}
                            fullWidth
                            disabled={!hotRackEnabled}
                          />
                        </Grid>
                      </>
                    )}
                  </Grid>
                </>
              )}
            </RHFAccordion>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  if (activeStep === 0) {
    return (
      <Grid container spacing={1.2}>
        {step0}
      </Grid>
    );
  }

  if (activeStep === 1) {
    return (
      <Grid container spacing={1.2}>
        {step1}
      </Grid>
    );
  }

  if (activeStep === 2) {
    return (
      <Grid container spacing={1.2}>
        {step2}
      </Grid>
    );
  }

  return <EmptyState />;
};

WarehouseFields.propTypes = Props;

export default WarehouseFields;
