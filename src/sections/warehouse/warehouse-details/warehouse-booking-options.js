import { Box, Button, Card, CardContent, Grid, Stack, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { fCurrency, fNumber } from 'src/utils/format-number';
import { ICONS } from '../config-warehouse';

const OptionsDetailsCardProps = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  amountType: PropTypes.string.isRequired,
};

const OptionsDetailsCard = ({ title, amount, description, amountType }) => (
  <Box>
    <Typography
      fontWeight="bold"
      color="primary"
      sx={{
        fontSize: {
          xs: '12px',
          md: '14px',
        },
      }}
    >
      {title}
    </Typography>
    <Box>
      <Typography
        component="span"
        sx={{
          fontWeight: 'bold',
          fontSize: {
            xs: '22px',
            md: '28px',
          },
        }}
      >
        {amount}
      </Typography>
      <Typography
        component="span"
        sx={{
          fontWeight: 'bold',
          fontSize: {
            xs: '17px',
            md: '22px',
          },
        }}
      >
        {amountType}
      </Typography>
    </Box>
    <Typography
      sx={{
        fontSize: {
          xs: '10px',
          md: '11px',
        },
      }}
    >
      {description}
    </Typography>
  </Box>
);

OptionsDetailsCard.propTypes = OptionsDetailsCardProps;

const OptionsMonthCardProps = {
  month: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  setSelected: PropTypes.func.isRequired,
  isDark: PropTypes.bool.isRequired,
};

const OptionsMonthCard = ({ month, isSelected, setSelected, isDark }) => (
  <Card
    onClick={() => setSelected(month)}
    sx={{
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: isSelected ? '#00A76F' : 'transparent',
      cursor: 'pointer',
      bgcolor: isDark ? 'background.neutral' : 'background.default',
    }}
  >
    <CardContent sx={{ textAlign: 'center' }}>
      <Typography variant="h3">{month}</Typography>
      <Typography variant="body2">Month</Typography>
    </CardContent>
  </Card>
);

OptionsMonthCard.propTypes = OptionsMonthCardProps;

const WarehouseBookingOptionsProps = {
  space: PropTypes.number.isRequired,
  pricePerSquare: PropTypes.number.isRequired,
  showPurchase: PropTypes.bool.isRequired,
};

/**
 * @param {WarehouseBookingOptionsProps} props
 * @returns {JSX.Element}
 */
const WarehouseBookingOptions = (props) => {
  const { space, pricePerSquare, showPurchase } = props;
  const [selectedMonth, setSelectedMonth] = useState(1);
  const { palette } = useTheme();

  console.log({ showPurchase });

  return (
    <Card sx={{ bgcolor: 'background.paper', borderRadius: 1, padding: 2 }}>
      <Typography variant="h5" sx={{ mb: 4 }}>
        Check Availability and Your Monthly Cost
      </Typography>

      <Grid container sx={{ mb: 5 }} spacing={2}>
        <Grid item xs={6}>
          <OptionsDetailsCard
            title="Total Available Space"
            amount={`${fNumber(space)}`}
            amountType=" sq. ft"
            description="Space availability is based on date range."
          />
        </Grid>
        <Grid item xs={6}>
          <OptionsDetailsCard
            title="Total Available Space"
            amount={`${fCurrency(pricePerSquare)} /`}
            amountType="sq. ft"
            description="*Minimum Order Qty: 7,000 sq. ft"
          />
        </Grid>
      </Grid>

      <Grid container spacing={1} sx={{ mb: 5 }}>
        {[1, 3, 6, 12].map((month) => (
          <Grid key={month} item xs={6} md={3}>
            <OptionsMonthCard
              month={month}
              isSelected={month === selectedMonth}
              setSelected={setSelectedMonth}
              isDark={palette.mode === 'dark'}
            />
          </Grid>
        ))}
      </Grid>

      <Stack
        sx={{
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
        }}
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          {`Total Price:   ${fCurrency(7000 * pricePerSquare * selectedMonth)}`}
        </Typography>
        {showPurchase ? (
          <Button color="primary" variant="contained" size="large" endIcon={ICONS.purchase()}>
            Purchase
          </Button>
        ) : null}
      </Stack>
    </Card>
  );
};

WarehouseBookingOptions.propTypes = WarehouseBookingOptionsProps;

export default WarehouseBookingOptions;
