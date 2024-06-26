import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
// mui
import { Box, Button, Card, Chip, Divider, Grid, Stack, Typography, useTheme } from '@mui/material';
// hooks
import { useDialog } from 'src/hooks/use-dialog';
// utils
import { fCurrency, fNumber } from 'src/utils/format-number';
// components
import { PurchaseDialog } from 'src/components/common/custom-dialog';
import { WarehouseMonthCard } from 'src/components/warehouse/cards';
// constants
import { getWarehouseDiscount } from 'src/components/warehouse/utills';
import { CUBIC_FEET_PER_PALLET, SQUARE_FEET_PER_PALLET } from 'src/constant/pallet';
import { ICONS } from '../../../../../sections/private/dashboard/warehouses/config-warehouse';
import DetailsLogo from '../details-logo';
import PromoField from './promo-field';
import SpaceField from './space-field';
// ----------------------------------------------------------------------

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
  heading1Discount: {
    fontWeight: 'bold',
    fontSize: {
      xs: '28px',
      sm: '32px',
    },
  },
  disabledHeading1: {
    fontWeight: 'bold',
    fontSize: {
      xs: '16px',
      sm: '20px',
    },
  },
  heading2: {
    fontWeight: 'bold',
    fontSize: {
      xs: '20px',
      sm: '22px',
    },
  },
  heading2Discount: {
    fontWeight: 'bold',
    fontSize: {
      xs: '22px',
      sm: '24px',
    },
  },
  disabledHeading2: {
    fontWeight: 'bold',
    fontSize: {
      xs: '14px',
      sm: '16px',
    },
  },
  description: {
    fontSize: '12px',
    color: 'text.secondary',
  },
};

const Props = {
  /** @type {Warehouse} */
  warehouse: PropTypes.object.isRequired,
  showPurchase: PropTypes.bool.isRequired,
};

// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const DetailsBooking = (props) => {
  const { warehouse, showPurchase } = props;

  // select default month
  const defaultMonth = useMemo(() => {
    if (warehouse?.price1) return 1;
    if (warehouse?.price3) return 3;
    if (warehouse?.price6) return 6;
    if (warehouse?.price12) return 12;
    return 0;
  }, [warehouse]);

  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
  const [requiredSpace, setRequiredSpace] = useState(1);
  const [error, setError] = useState(undefined);
  const { palette } = useTheme();
  const paymentDialog = useDialog();

  const discountEnabled = useMemo(
    () => warehouse?.hotRackEnabled || false,
    [warehouse?.hotRackEnabled]
  );

  const discountMonth = useMemo(() => {
    let discount;

    // if discount enabled then make it count
    if (discountEnabled) {
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
    }
    return discount || 0;
  }, [
    discountEnabled,
    selectedMonth,
    warehouse?.discount1,
    warehouse?.discount12,
    warehouse?.discount3,
    warehouse?.discount6,
  ]);

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
  const discount = useMemo(() => {
    if (warehouse?.discountOption === 'percentage' && discountMonth && currentPrice) {
      return Number(Number((discountMonth / 100) * currentPrice).toFixed(2));
    }

    if (warehouse?.discountOption === 'fixed') {
      return discountMonth;
    }
    return 0;
  }, [currentPrice, discountMonth, warehouse?.discountOption]);

  const discountedPricePerPallet = Number(Number(currentPrice - discount).toFixed(2));
  const totalPrice = currentPrice * selectedMonth * requiredSpace;
  const totalDiscount = discount * selectedMonth * requiredSpace;
  const monthlyTotal = discountedPricePerPallet * requiredSpace;

  // open payment dialog
  const openPaymentDialog = useCallback(() => {
    /** @type {import('src/components/common/custom-dialog/purchase-dialog').PurchaseData} */
    const struct = {
      warehouseId: warehouse?.id,
      selectedTerm: selectedMonth,
      quantityOfPallet: requiredSpace,
      pricePerPallet: currentPrice,
      discountedPricePerPallet,
      monthlyTotal,
      amountDue: monthlyTotal,
    };

    paymentDialog.onOpen(struct);
  }, [
    warehouse?.id,
    currentPrice,
    selectedMonth,
    requiredSpace,
    discountedPricePerPallet,
    monthlyTotal,
    paymentDialog,
  ]);

  // update according to warehouse
  useEffect(() => {
    if (warehouse.minSpaceOrder) setRequiredSpace(warehouse.minSpaceOrder);
  }, [warehouse.minSpaceOrder]);

  return (
    <>
      <Card sx={{ bgcolor: 'background.paper', borderRadius: 1, py: 2.5, px: 2.5 }}>
        {!!discountEnabled && (
          <Stack direction="row" spacing={0.5} flexWrap="wrap" alignItems="start" sx={{ mb: 1 }}>
            <Chip
              label="HotRack"
              color="secondary"
              variant="filled"
              icon={ICONS.hot()}
              sx={{ color: 'white' }}
            />

            <Chip
              label={`${Math.ceil(getWarehouseDiscount(warehouse))}% OFF`}
              color="secondary"
              variant="filled"
              icon={ICONS.discount()}
              sx={{ color: 'white' }}
            />
          </Stack>
        )}
        <Typography variant="h5" sx={{ mb: 4 }}>
          Reserve Your Space In this Warehouse Now
        </Typography>

        <Grid container sx={{ mb: 5 }} rowSpacing={1.5} columnSpacing={2}>
          <Grid item xs={12} sm={6}>
            <Stack>
              <Typography fontWeight="bold" color="primary" sx={bookingInfoStyle.title}>
                Reserve Now:
              </Typography>
              <Stack
                direction="row"
                columnGap={0.5}
                rowGap={0}
                alignItems="baseline"
                flexWrap="wrap"
              >
                <Typography component="span" sx={bookingInfoStyle.heading2}>
                  Up to
                </Typography>
                <Typography component="span" sx={bookingInfoStyle.heading1} mr={0.5}>
                  {fNumber(warehouse.maxSpaceOrder || warehouse.totalSpace)}
                </Typography>
                <Typography component="span" sx={bookingInfoStyle.heading2}>
                  pallets
                </Typography>
              </Stack>
              <Typography sx={bookingInfoStyle.description}>
                {fNumber(warehouse.maxSpaceOrder * SQUARE_FEET_PER_PALLET)} square feet
                <br />
                {fNumber(warehouse.maxSpaceOrder * CUBIC_FEET_PER_PALLET)} cubic feet
              </Typography>
              <Typography sx={bookingInfoStyle.description}>
                {fNumber(warehouse.minSpaceOrder)} pallets (minimum)
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
                sx={{
                  position: 'relative',
                  mb: 1,
                  color: discount ? 'text.disabled' : 'text.primary',
                }}
              >
                <Typography
                  sx={discount ? bookingInfoStyle.disabledHeading1 : bookingInfoStyle.heading1}
                  color="inherit"
                >
                  {fCurrency(currentPrice)}
                </Typography>
                <Typography
                  sx={discount ? bookingInfoStyle.disabledHeading1 : bookingInfoStyle.heading1}
                  color="inherit"
                >
                  /
                </Typography>
                <Typography
                  sx={discount ? bookingInfoStyle.disabledHeading2 : bookingInfoStyle.heading2}
                  color="inherit"
                >
                  pallet
                </Typography>
                {!!discount && (
                  <Divider
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      width: '100px',
                      borderWidth: '1.5px',
                      borderColor: 'secondary.main',
                    }}
                  />
                )}
              </Stack>

              {!!discount && (
                <Stack
                  direction="row"
                  columnGap={0.5}
                  rowGap={0}
                  alignItems="baseline"
                  flexWrap="wrap"
                  sx={{ color: 'secondary.main', position: 'relative' }}
                >
                  <Box sx={{ position: 'absolute', top: 4, left: '-32px' }}>
                    {ICONS.hot(36, { color: 'secondary.main' })}
                  </Box>
                  <Typography sx={bookingInfoStyle.heading1Discount} color="inherit">
                    {fCurrency(discountedPricePerPallet)}
                  </Typography>
                  <Typography sx={bookingInfoStyle.heading1Discount} color="inherit">
                    /
                  </Typography>
                  <Typography sx={bookingInfoStyle.heading2Discount} color="inherit">
                    pallet
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Stack>
              <Typography fontWeight="bold" color="primary" sx={bookingInfoStyle.title}>
                Total Available Space
              </Typography>
              <Typography sx={bookingInfoStyle.description}>
                <b>{fNumber(warehouse.totalSpace)}</b> pallets
              </Typography>
              <Typography sx={bookingInfoStyle.description}>
                {fNumber(warehouse.totalSpace * SQUARE_FEET_PER_PALLET)} square feet
                <br />
                {fNumber(warehouse.totalSpace * CUBIC_FEET_PER_PALLET)} cubic feet
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6}>
            {!!warehouse?.logo && (
              <Box width={1}>
                <DetailsLogo logo={warehouse?.logo} />
              </Box>
            )}
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
                disable={!warehouse?.[`price${month}`]}
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

        <Grid mb={1} container spacing={0}>
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

        {warehouse?.hasPromo && <PromoField value="" onChange={() => {}} sx={{ mb: 3 }} />}

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
            {fCurrency(monthlyTotal) || '$0.00'}
          </Typography>
        </Stack>
        {!!totalDiscount && !!discount && (
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
              {fCurrency(totalDiscount) || '$0.00'}
            </Typography>
          </Stack>
        )}

        {showPurchase ? (
          <Button
            color="primary"
            variant="contained"
            size="large"
            endIcon={ICONS.purchase()}
            onClick={openPaymentDialog}
            disabled={!!error || totalPrice === undefined || !defaultMonth}
            sx={{ mt: 1.5 }}
            fullWidth
          >
            Reserve
          </Button>
        ) : null}
      </Card>

      <PurchaseDialog
        open={paymentDialog.open}
        onClose={paymentDialog.onClose}
        purchaseData={paymentDialog.value}
      />
    </>
  );
};

DetailsBooking.propTypes = Props;

export default DetailsBooking;
