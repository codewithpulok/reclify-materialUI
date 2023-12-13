import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useState } from 'react';

const OptionsDetailsCard = ({ title, amount, description, amountType }) => {
  return (
    <Box>
      <Typography
        fontWeight={'bold'}
        color={'primary'}
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
          component={'span'}
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
          component={'span'}
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
};

const OptionsMonthCard = ({ month, selected, setSelected }) => {
  return (
    <Card
      onClick={() => setSelected(month)}
      sx={
        selected
          ? {
              borderWidth: 2,
              borderStyle: 'solid',
              borderColor: '#00A76F',
            }
          : {
              cursor: 'pointer',
            }
      }
    >
      <CardContent
        sx={{
          textAlign: 'center',
        }}
      >
        <Typography variant="h3">{month}</Typography>
        <Typography variant="body2">Month</Typography>
      </CardContent>
    </Card>
  );
};

const WarehouseBookingOptions = ({ space, price }) => {
  const [selectedMonth, setSelectedMonth] = useState(1);

  return (
    <Box sx={{ bgcolor: 'Background', padding: 2, borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" sx={{ mb: 4 }}>
        Check Availability and Your Monthly Cost
      </Typography>

      <Grid container sx={{ mb: 5 }} spacing={2}>
        <Grid item xs={6}>
          <OptionsDetailsCard
            title={'Total Available Space'}
            amount={space}
            amountType={' sq. ft'}
            description={'Space availability is based on date range.'}
          />
        </Grid>
        <Grid item xs={6}>
          <OptionsDetailsCard
            title={'Total Available Space'}
            amount={`$${price} /`}
            amountType={'sq. ft'}
            description={'*Minimum Order Qty: 7,000 sq. ft'}
          />
        </Grid>
      </Grid>

      <Grid container spacing={1} sx={{ mb: 5 }}>
        {[1, 3, 6, 12].map((month) => (
          <Grid key={month} item xs={6} md={3}>
            <OptionsMonthCard
              month={month}
              selected={month === selectedMonth}
              setSelected={setSelectedMonth}
            />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" sx={{ textAlign: 'center' }}>
        {`Total Price:   $${7000 * price * selectedMonth}`}
      </Typography>
    </Box>
  );
};

export default WarehouseBookingOptions;
