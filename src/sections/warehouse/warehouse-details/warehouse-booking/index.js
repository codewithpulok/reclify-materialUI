import { Box, Button, Card, Chip, Grid, Stack, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { PaymentDialog } from 'src/components/common/custom-dialog';
import { WarehouseMonthCard } from 'src/components/warehouse/cards';
import { CUBIC_FEET_PER_PALLET, SQUARE_FEET_PER_PALLET } from 'src/constant/pallet';
import { useBoolean } from 'src/hooks/use-boolean';
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
  const [requiredSpace, setRequiredSpace] = useState(0);
  const [error, setError] = useState(undefined);
  const { palette } = useTheme();
  const paymentDialog = useBoolean();

  const totalPrice = useMemo(() => {
    if (requiredSpace && warehouse?.pricePerSpace && selectedMonth) {
      return requiredSpace * warehouse.pricePerSpace * selectedMonth;
    }
    return undefined;
  }, [requiredSpace, selectedMonth, warehouse]);

  const discount = useMemo(() => {
    if (warehouse.discountRate && totalPrice) {
      return (warehouse.discountRate / 100) * totalPrice;
    }
    return 0;
  }, [totalPrice, warehouse.discountRate]);

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
              color="warning"
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
              <Stack direction="row" spacing={1} alignItems="baseline">
                <Typography component="span" sx={bookingInfoStyle.heading1}>
                  {fNumber(warehouse.totalSpace)}
                </Typography>
                <Typography component="span" sx={bookingInfoStyle.heading2}>
                  pallets
                </Typography>
              </Stack>
              <Typography sx={bookingInfoStyle.description}>
                {SQUARE_FEET_PER_PALLET} square foot per pallet, {CUBIC_FEET_PER_PALLET} cubic foot
                per pallet
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography fontWeight="bold" color="primary" sx={bookingInfoStyle.title}>
                Price per Pallet
              </Typography>
              <Stack direction="row" spacing={0.5} alignItems="baseline">
                <Typography sx={bookingInfoStyle.heading1}>
                  {fCurrency(warehouse.pricePerSpace)}
                </Typography>
                <Typography sx={bookingInfoStyle.heading1}>/</Typography>
                <Typography sx={bookingInfoStyle.heading2}>pallete</Typography>
              </Stack>
              <Typography sx={bookingInfoStyle.description}>
                * Order Quantity Limit:
                <br />- Minimum: {fNumber(warehouse.minSpaceOrder)} pallets
                <br />- Maximum: {fNumber(warehouse.maxSpaceOrder)} pallets
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
          min={warehouse.minSpaceOrder}
          max={warehouse.maxSpaceOrder}
        />

        <Grid mb={3} container spacing={0}>
          <Grid item xs={12} sm={6}>
            <Typography color="text.secondary" variant="overline" width="100%">
              Square foot: {fNumber(SQUARE_FEET_PER_PALLET * requiredSpace)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography color="text.secondary" variant="overline" width="100%">
              Cubic foot: {fNumber(CUBIC_FEET_PER_PALLET * requiredSpace)}
            </Typography>
          </Grid>
        </Grid>

        <Stack
          direction="row"
          alignItems="baseline"
          justifyContent="center"
          spacing={0.5}
          flexWrap="wrap"
        >
          <Typography variant="h5">Total Price:</Typography>
          <Typography variant="h5" ml={1} color={discount > 0 ? 'warning.main' : 'default'}>
            {totalPrice !== undefined ? fCurrency(totalPrice - discount) : '$0.00'}
          </Typography>
          {discount > 0 ? (
            <Typography
              variant="subtitle1"
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
            onClick={paymentDialog.onTrue}
            disabled={!!error || totalPrice === undefined}
            sx={{ mt: 1.5 }}
            fullWidth
          >
            Purchase
          </Button>
        ) : null}
      </Card>

      <PaymentDialog open={paymentDialog.value} onClose={paymentDialog.onFalse} />
    </>
  );
};

WarehouseBooking.propTypes = Props;

export default WarehouseBooking;
