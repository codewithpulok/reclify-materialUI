import { Alert, Button, Grid, InputAdornment, MenuItem, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { ReferenceTextField } from 'src/components/common/custom-fields';
import { RHFAccordion, RHFSwitch, RHFTextField } from 'src/components/common/hook-form';
import { SQUARE_FEET_PER_PALLET } from 'src/constant/pallet';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { restrictNegetiveValue, restrictPercentValue } from 'src/utils/form';
import { fCurrency, fFixedFloat } from 'src/utils/format-number';
import NotVerifiedAlert from './common/not-verified-alert';

const DiscountResult = (props) => {
  const { error, label, value, disabled } = props;

  const color = error ? 'error.main' : 'inherit';

  return (
    <Stack>
      <Typography variant="caption" color={disabled ? 'text.disabled' : color}>
        {label}
      </Typography>
      <Typography variant="subtitle1" color={disabled ? 'text.disabled' : color}>
        {value}
      </Typography>
    </Stack>
  );
};

DiscountResult.propTypes = {
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.string,
};

/**
 * @param {Step2.propTypes} props
 * @returns {JSX.Element}
 */
const Step2 = (props) => {
  const { source } = props;
  const { user } = useAppSelector(selectAuth);

  // form state
  const { watch, setValue } = useFormContext();
  const hotRackEnabled = watch('hotRackEnabled', false);
  const discountOption = watch('discountOption', 'percentage');
  const isPercentage = discountOption === 'percentage';

  const price1 = watch('price1');
  const price3 = watch('price3');
  const price6 = watch('price6');
  const price12 = watch('price12');

  const discount1 = watch('discount1');
  const discount3 = watch('discount3');
  const discount6 = watch('discount6');
  const discount12 = watch('discount12');

  const values = watch();

  // ACTIONS ----------------------------------------------------------------------

  // reset discount
  const resetDiscount = () => {
    setValue('discount1', 0);
    setValue('discount3', 0);
    setValue('discount6', 0);
    setValue('discount12', 0);
  };

  // get monthly discount
  const monthlyDiscount = useCallback(
    (price, discount) => {
      if (!price) return 0;

      if (isPercentage) {
        const discountedPrice = (discount / 100) * price;
        return price - discountedPrice;
      }

      return price - (discount || 0);
    },
    [isPercentage]
  );

  // reset discount field on price goes bellow 0
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

  const fixedOptions = (
    <>
      <Grid item xs={12} md={6}>
        <RHFTextField
          type="number"
          name="discount1"
          label="Discount for 1 Month"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">{isPercentage ? '%' : '$'}</InputAdornment>
            ),
          }}
          onChangeMiddleware={isPercentage ? restrictPercentValue : restrictNegetiveValue}
          fullWidth
          disabled={!hotRackEnabled || !price1}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <DiscountResult
          label="Discounted Price 1 Month"
          value={fCurrency(monthlyDiscount(price1, discount1))}
          error={monthlyDiscount(price1, discount1) <= 0}
          disabled={!hotRackEnabled || !price1}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <RHFTextField
          type="number"
          name="discount3"
          label="Discount for 3 Month"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">{isPercentage ? '%' : '$'}</InputAdornment>
            ),
          }}
          onChangeMiddleware={isPercentage ? restrictPercentValue : restrictNegetiveValue}
          fullWidth
          disabled={!hotRackEnabled || !price3}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <DiscountResult
          label="Discounted Price 3 Month"
          value={fCurrency(monthlyDiscount(price3, discount3))}
          error={monthlyDiscount(price3, discount3) <= 0}
          disabled={!hotRackEnabled || !price3}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <RHFTextField
          type="number"
          name="discount6"
          label="Discount for 6 Month"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">{isPercentage ? '%' : '$'}</InputAdornment>
            ),
          }}
          onChangeMiddleware={restrictNegetiveValue}
          fullWidth
          disabled={!hotRackEnabled || !price6}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <DiscountResult
          label="Discounted Price 6 Month"
          value={fCurrency(monthlyDiscount(price6, discount6))}
          error={monthlyDiscount(price6, discount6) <= 0}
          disabled={!hotRackEnabled || !price6}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <RHFTextField
          type="number"
          name="discount12"
          label="Discount for 12 Month"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">{isPercentage ? '%' : '$'}</InputAdornment>
            ),
          }}
          onChangeMiddleware={isPercentage ? restrictPercentValue : restrictNegetiveValue}
          fullWidth
          disabled={!hotRackEnabled || !price12}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <DiscountResult
          label="Discounted Price 12 Month"
          value={fCurrency(monthlyDiscount(price12, discount12))}
          error={monthlyDiscount(price12, discount12) <= 0}
          disabled={!hotRackEnabled || !price12}
        />
      </Grid>
    </>
  );

  const freeAlert = (
    <Alert sx={{ mb: 2 }} icon={false} severity="warning">
      <Typography variant="inherit">
        You need to upgrade to a paid membership to add discount
      </Typography>
      <Button
        LinkComponent={RouterLink}
        href={paths.settings.subscriptions}
        variant="soft"
        color="warning"
        sx={{ mt: 1.5 }}
      >
        Upgrade Your Subscription
      </Button>
    </Alert>
  );

  const firstSection = (
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
          {!source?.isVerified && <NotVerifiedAlert warehouse={values} />}

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
  );

  return (
    <Grid container spacing={1.2}>
      <Grid item xs={12} md={6}>
        {firstSection}
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container spacing={1.2}>
          <Grid item xs={12}>
            <RHFAccordion
              names={['discount1', 'discount3', 'discount6', 'discount12', 'hotRackEnabled']}
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
                    hideHelperText
                  />
                )
              }
            >
              {user?.planId === 'free' && freeAlert}
              <Stack
                sx={user?.planId === 'free' ? { filter: 'blur(1.4px)', pointerEvents: 'none' } : {}}
              >
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
                      onChangeMiddleware={(v) => {
                        resetDiscount();
                        return v;
                      }}
                    >
                      <MenuItem disabled>Select Discount Option</MenuItem>
                      <MenuItem value="fixed">Fixed</MenuItem>
                      <MenuItem value="percentage">Percentage</MenuItem>
                    </RHFTextField>
                  </Grid>
                  {fixedOptions}
                </Grid>
              </Stack>
            </RHFAccordion>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

Step2.propTypes = {
  /** @type {Warehouse} */
  source: PropTypes.object,
};

export default Step2;
