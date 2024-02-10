import { Box, Button, Card, Chip, Grid, Stack, Typography, useTheme } from '@mui/material';
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

  const totalPrice = useMemo(() => {
    if (requiredSpace && currentPrice && selectedMonth) {
      return requiredSpace * currentPrice * selectedMonth;
    }
    return undefined;
  }, [requiredSpace, selectedMonth, currentPrice]);

  const totalDiscount = useMemo(() => {
    if (warehouse.discountRate && totalPrice) {
      return (warehouse.discountRate / 100) * totalPrice;
    }
    return 0;
  }, [totalPrice, warehouse.discountRate]);

  const totalPricePerMonth = useMemo(() => {
    if (requiredSpace && currentPrice) {
      return requiredSpace * currentPrice;
    }
    return undefined;
  }, [requiredSpace, currentPrice]);

  const discountPerMonth = useMemo(() => {
    if (warehouse.discountRate && totalPricePerMonth) {
      return (warehouse.discountRate / 100) * totalPricePerMonth;
    }
    return 0;
  }, [totalPricePerMonth, warehouse.discountRate]);

  // open payment dialog
  const openPaymentDialog = useCallback(() => {
    /** @type {import('src/components/common/custom-dialog/purchase-payment-dialog').PurchaseData} */
    const struct = {
      warehouseId: warehouse?.id,
      discount: discountPerMonth,
      price: totalPricePerMonth,
      month: selectedMonth,
      pallet: requiredSpace,
      total: totalPrice,
      amountDue: totalPricePerMonth - discountPerMonth,
    };

    paymentDialog.onOpen(struct);
  }, [
    discountPerMonth,
    paymentDialog,
    requiredSpace,
    selectedMonth,
    totalPrice,
    totalPricePerMonth,
    warehouse,
  ]);

  // update according to warehouse
  useEffect(() => {
    if (warehouse.minSpaceOrder) setRequiredSpace(warehouse.minSpaceOrder);
  }, [warehouse.minSpaceOrder]);

  return (
    <>
      <Card sx={{ bgcolor: 'background.paper', borderRadius: 1, py: 2.5, px: 2.5 }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Check Availability and Your Monthly Cost
        </Typography>

        <Stack direction="row" spacing={0.5} flexWrap="wrap" alignItems="start" sx={{ mb: 3 }}>
          {warehouse.discountRate > 0 && (
            <Chip
              label={`${warehouse.discountRate}% OFF`}
              color="secondary"
              variant="outlined"
              icon={ICONS.discount()}
            />
          )}
        </Stack>

        <Grid container sx={{ mb: 5 }} spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography fontWeight="bold" color="primary" sx={bookingInfoStyle.title}>
                Total Available Space
              </Typography>
              <Stack direction="row" columnGap={1} rowGap={0} alignItems="baseline" flexWrap="wrap">
                <Typography component="span" sx={bookingInfoStyle.heading1}>
                  {fNumber(warehouse.totalSpace)}
                </Typography>
                <Typography component="span" sx={bookingInfoStyle.heading2}>
                  pallets
                </Typography>
              </Stack>
              <Typography sx={bookingInfoStyle.description}>
                {warehouse.totalSpace >= 0 && (
                  <>
                    {fNumber(warehouse.totalSpace * SQUARE_FEET_PER_PALLET)} square feet
                    <br />
                    {fNumber(warehouse.totalSpace * CUBIC_FEET_PER_PALLET)} cubic feet
                  </>
                )}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography fontWeight="bold" color="primary" sx={bookingInfoStyle.title}>
                Price per Pallet
              </Typography>
              <Stack
                direction="row"
                columnGap={0.5}
                rowGap={0}
                alignItems="baseline"
                flexWrap="wrap"
              >
                <Typography sx={bookingInfoStyle.heading1}>{fCurrency(currentPrice)}</Typography>
                <Typography sx={bookingInfoStyle.heading1}>/</Typography>
                <Typography sx={bookingInfoStyle.heading2}>pallet</Typography>
              </Stack>
              <Typography sx={bookingInfoStyle.description}>
                {warehouse?.minSpaceOrder && warehouse?.maxSpaceOrder
                  ? '* Order Quantity Limit:'
                  : null}

                {warehouse?.minSpaceOrder && warehouse?.minSpaceOrder > 0 ? (
                  <>
                    <br />
                    Minimum: {fNumber(warehouse.minSpaceOrder)} pallets
                  </>
                ) : null}
                {warehouse?.maxSpaceOrder && warehouse?.maxSpaceOrder > 0 ? (
                  <>
                    <br />
                    Maximum: {fNumber(warehouse.maxSpaceOrder)} pallets
                  </>
                ) : null}
              </Typography>
            </Box>
          </Grid>
        </Grid>

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
          <Typography variant="h5">Monthly Price:</Typography>
          <Typography
            variant="h5"
            ml={1}
            color={discountPerMonth > 0 ? 'secondary.main' : 'default'}
          >
            {totalPricePerMonth !== undefined
              ? fCurrency(totalPricePerMonth - discountPerMonth)
              : '$0.00'}
          </Typography>
          {discountPerMonth > 0 ? (
            <Typography
              variant="subtitle1"
              color="text.disabled"
              sx={{ textDecoration: 'line-through' }}
            >
              {` ${fCurrency(totalPricePerMonth)} `}
            </Typography>
          ) : null}
        </Stack>
        <Stack
          direction="row"
          alignItems="baseline"
          justifyContent="center"
          spacing={0.5}
          flexWrap="wrap"
        >
          <Typography variant="overline" color="text.secondary">
            Total Price:
          </Typography>
          <Typography
            variant="overline"
            ml={1}
            color={totalDiscount > 0 ? 'secondary.main' : 'text.secondary'}
          >
            {totalPrice !== undefined ? fCurrency(totalPrice - totalDiscount) : '$0.00'}
          </Typography>
          {totalDiscount > 0 ? (
            <Typography
              variant="overline"
              color="text.disabled"
              sx={{ textDecoration: 'line-through' }}
            >
              {` ${fCurrency(totalPrice)} `}
            </Typography>
          ) : null}
        </Stack>

        {showPurchase ? (
          <Button
            color="primary"
            variant="contained"
            size="large"
            endIcon={ICONS.purchase()}
            onClick={openPaymentDialog}
            disabled={!!error || totalPrice === undefined}
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
