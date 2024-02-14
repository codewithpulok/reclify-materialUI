import { Button, Card, Chip, Grid, Stack, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { PurchasePaymentDialog } from 'src/components/common/custom-dialog';
import { WarehouseMonthCard } from 'src/components/warehouse/cards';
import { CUBIC_FEET_PER_PALLET, SQUARE_FEET_PER_PALLET } from 'src/constant/pallet';
import { useDialog } from 'src/hooks/use-dialog';
import { fCurrency, fNumber } from 'src/utils/format-number';
import { ICONS } from '../../config-warehouse';
import SpaceField from './space-field';

/** @type {{title: SxProps, heading1: SxProps, heading2: SxProps, description: SxProps}} */
const bookingInfoStyle = {
  title: {
    fontSize: '14px',
  },
  heading1: {
    fontWeight: 'bold',
    fontSize: {
      xs: '24px',
      sm: '28px',
    },
  },
  heading2: {
    fontWeight: 'bold',
    fontSize: {
      xs: '20px',
      sm: '22px',
    },
  },
  description: {
    fontSize: '11px',
    color: 'text.secondary',
  },
};

const Props = {
  /** @type {Warehouse} */
  warehouse: PropTypes.object.isRequired,
  showPurchase: PropTypes.bool.isRequired,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const WarehouseBooking = (props) => {
  const { warehouse, showPurchase } = props;
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [requiredSpace, setRequiredSpace] = useState(1);
  const [error, setError] = useState(undefined);
  const { palette } = useTheme();
  const paymentDialog = useDialog();

  const discountAll = useMemo(() => warehouse?.discountAll || 0, [warehouse?.discountAll]);
  const discountRate = useMemo(() => warehouse?.discountRate || 0, [warehouse?.discountRate]);
  const discountMonth = useMemo(() => {
    let discount;
    switch (selectedMonth) {
      case 1:
        discount = warehouse?.discount1 || 0;
        break;
      case 3:
        discount = warehouse?.discount3 || 0;
        break;
      case 6:
        discount = warehouse?.discount6 || 0;
        break;
      case 12:
        discount = warehouse?.discount12 || 0;
        break;
      default:
        break;
    }
    return discount || 0;
  }, [selectedMonth, warehouse]);

  // current price maybe differ based on selected month
  const currentPrice = useMemo(() => {
    let price;
    switch (selectedMonth) {
      case 1:
        price = warehouse.price1;
        break;
      case 3:
        price = warehouse.price3;
        break;
      case 6:
        price = warehouse.price6;
        break;
      case 12:
        price = warehouse.price12;
        break;
      default:
        break;
    }
    return price || 0;
  }, [selectedMonth, warehouse]);
  // discount in current price
  const currentDiscountRate = useMemo(() => {
    if (discountRate && currentPrice) {
      return (discountRate / 100) * currentPrice;
    }
    return 0;
  }, [currentPrice, discountRate]);

  const annualPrice = currentPrice * selectedMonth;
  const annualDiscount = currentDiscountRate * selectedMonth;

  const monthlyPrice = currentPrice * 1;
  const monthlyDiscount = currentDiscountRate * 1;

  const totalDiscountPerMonth = monthlyDiscount + discountMonth + discountAll;
  const totalDiscountPerAnnual = annualDiscount + discountMonth + discountAll;

  // open payment dialog
  const openPaymentDialog = useCallback(() => {
    /** @type {import('src/components/common/custom-dialog/purchase-payment-dialog').PurchaseData} */
    const struct = {
      warehouseId: warehouse?.id,
      amountDue: monthlyPrice - totalDiscountPerMonth,
      discountedPricePerPallet: currentPrice - totalDiscountPerMonth,
      monthlyTotal: monthlyPrice - totalDiscountPerMonth,
      selectedTerm: selectedMonth,
      quantityOfPallet: requiredSpace,
      pricePerPallet: currentPrice,
    };

    paymentDialog.onOpen(struct);
  }, [
    warehouse?.id,
    monthlyPrice,
    totalDiscountPerMonth,
    currentPrice,
    selectedMonth,
    requiredSpace,
    paymentDialog,
  ]);

  // update according to warehouse
  useEffect(() => {
    if (warehouse.minSpaceOrder) setRequiredSpace(warehouse.minSpaceOrder);
  }, [warehouse.minSpaceOrder]);

  return (
    <>
      <Card sx={{ bgcolor: 'background.paper', borderRadius: 1, py: 2.5, px: 2.5 }}>
        {!!warehouse.discountRate && (
          <Stack direction="row" spacing={0.5} flexWrap="wrap" alignItems="start" sx={{ mb: 1 }}>
            <Chip label="Hot Rack" color="secondary" variant="filled" icon={ICONS.hot()} />
            <Chip
              label={`${warehouse.discountRate}% OFF`}
              color="secondary"
              variant="outlined"
              icon={ICONS.discount()}
            />
          </Stack>
        )}
        <Typography variant="h5" sx={{ mb: 4 }}>
          Check Availability and Your Monthly Cost
        </Typography>

        <Grid container sx={{ mb: 5 }} spacing={2}>
          <Grid item xs={12} sm={6}>
            <Stack>
              <Typography fontWeight="bold" color="primary" sx={bookingInfoStyle.title}>
                Reserve Now:
              </Typography>
              <Stack direction="row" columnGap={1} rowGap={0} alignItems="baseline" flexWrap="wrap">
                <Typography component="span" sx={bookingInfoStyle.heading1}>
                  {fNumber(warehouse.maxSpaceOrder)}
                </Typography>
                <Typography component="span" sx={bookingInfoStyle.heading2}>
                  pallets
                </Typography>
              </Stack>
              <Typography variant="subtitle2">
                {fNumber(warehouse.minSpaceOrder)} pallets (minimum)
              </Typography>
              <Typography sx={bookingInfoStyle.description}>
                Total available space
                <br />
                {fNumber(warehouse.totalSpace)} pallets
              </Typography>
              <Typography sx={bookingInfoStyle.description}>
                {fNumber(warehouse.totalSpace * SQUARE_FEET_PER_PALLET)} square feet
                <br />
                {fNumber(warehouse.totalSpace * CUBIC_FEET_PER_PALLET)} cubic feet
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack>
              <Typography fontWeight="bold" color="primary" sx={bookingInfoStyle.title}>
                Price
              </Typography>
              <Stack
                direction="row"
                columnGap={0.5}
                rowGap={0}
                alignItems="baseline"
                flexWrap="wrap"
                sx={discountMonth > 0 ? { color: 'text.disabled' } : { color: 'text.primary' }}
              >
                <Typography sx={bookingInfoStyle.heading1} color="inherit">
                  {fCurrency(currentPrice)}
                </Typography>
                <Typography sx={bookingInfoStyle.heading1} color="inherit">
                  /
                </Typography>
                <Typography sx={bookingInfoStyle.heading2} color="inherit">
                  pallet
                </Typography>
              </Stack>
              {!!discountMonth && (
                <Stack
                  direction="row"
                  columnGap={0.5}
                  rowGap={0}
                  alignItems="baseline"
                  flexWrap="wrap"
                  sx={{ color: 'secondary.main' }}
                >
                  {ICONS.hot(32, { color: 'secondary.main' })}
                  <Typography sx={bookingInfoStyle.heading1} color="inherit">
                    {fCurrency(currentPrice - discountMonth)}
                  </Typography>
                  <Typography sx={bookingInfoStyle.heading1} color="inherit">
                    /
                  </Typography>
                  <Typography sx={bookingInfoStyle.heading2} color="inherit">
                    pallet
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Grid>
        </Grid>

        <Typography fontWeight="bold" color="primary" sx={bookingInfoStyle.title} mb={1}>
          Select a Term:
        </Typography>
        <Grid container spacing={1} sx={{ mb: 3 }}>
          {[1, 3, 6, 12].map((month) => (
            <Grid key={month} item xs={6} md={3}>
              <WarehouseMonthCard
                month={month}
                isSelected={month === selectedMonth}
                setSelected={setSelectedMonth}
                isDark={palette.mode === 'dark'}
              />
            </Grid>
          ))}
        </Grid>

        <SpaceField
          value={requiredSpace}
          onChange={setRequiredSpace}
          error={error}
          setError={setError}
          sx={{ mb: 0.2 }}
          min={warehouse.minSpaceOrder || 1}
          max={warehouse.maxSpaceOrder || warehouse.totalSpace}
        />

        <Grid mb={3} container spacing={0}>
          <Grid item xs={12} sm={6}>
            <Typography color="text.secondary" variant="overline" width="100%">
              Square feet: {fNumber(SQUARE_FEET_PER_PALLET * requiredSpace)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography color="text.secondary" variant="overline" width="100%">
              Cubic feet: {fNumber(CUBIC_FEET_PER_PALLET * requiredSpace)}
            </Typography>
          </Grid>
        </Grid>

        <Stack
          direction="row"
          alignItems="baseline"
          justifyContent="center"
          spacing={0.5}
          flexWrap="wrap"
          mt={1}
        >
          <Typography variant="h5">Deposit:</Typography>
          <Typography variant="h5" ml={1}>
            {fCurrency(monthlyPrice - totalDiscountPerMonth) || '$0.00'}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="baseline"
          justifyContent="center"
          spacing={0.5}
          flexWrap="wrap"
        >
          <Typography variant="overline" color="secondary.main">
            You Save:
          </Typography>
          <Typography variant="overline" ml={1} color="secondary.main">
            {fCurrency(totalDiscountPerAnnual) || '$0.00'}
          </Typography>
        </Stack>

        {showPurchase ? (
          <Button
            color="primary"
            variant="contained"
            size="large"
            endIcon={ICONS.purchase()}
            onClick={openPaymentDialog}
            disabled={!!error || annualPrice === undefined}
            sx={{ mt: 1.5 }}
            fullWidth
          >
            Reserve
          </Button>
        ) : null}
      </Card>

      <PurchasePaymentDialog
        open={paymentDialog.open}
        onClose={paymentDialog.onClose}
        purchaseData={paymentDialog.value}
      />
    </>
  );
};

WarehouseBooking.propTypes = Props;

export default WarehouseBooking;
