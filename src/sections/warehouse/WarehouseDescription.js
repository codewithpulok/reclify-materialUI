import { Typography } from '@mui/material';

const WarehouseDescription = () => {
  return (
    <>
      <Typography
        variant="h5"
        sx={{ borderBottom: '1px solid', borderColor: 'ActiveBorder' }}
        pb={0.5}
        mb={1}
      >
        Description
      </Typography>
      <Typography variant="body2">
        **Min term is 1 year and min of 10k SQFT**
        <br />
        Storage of Pallets and Cartons Only - No work allowed in the space **Loading/ unloading
        services available**
        <br />
        Situated in the heart of industrial zone. 15 minutes away from the Port of Houston. Gated
        facility provides extra security. We offer daily, weekly and monthly warehouse spaces.
      </Typography>
    </>
  );
};

export default WarehouseDescription;
