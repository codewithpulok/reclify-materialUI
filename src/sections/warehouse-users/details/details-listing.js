import { Card, CardHeader, Grid, Pagination, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { WarehouseCard } from 'src/components/warehouse/cards';

const DetailsListingProps = {
  /** @type {Warehouse[]} */
  warehouses: PropTypes.arrayOf(PropTypes.object),
};

/**
 * @param {DetailsListingProps} props
 * @returns {JSX.Element}
 */
const DetailsListing = (props) => {
  const { warehouses = [] } = props;
  return (
    <Card>
      <CardHeader title="Warehouses" />
      <Stack my={3} px={3}>
        <Grid container spacing={2}>
          {warehouses.map((warehouse) => (
            <Grid item key={warehouse.id} xs={12} sm={6} md={4}>
              <WarehouseCard
                key={warehouse.id}
                warehouse={warehouse}
                // onDelete={() => handleDelete(warehouse)}
                // hasControl={user?.role === 'warehouse'}
                sx={{ boxShadow: 0 }}
              />
            </Grid>
          ))}
        </Grid>

        <Stack direction="row" justifyContent="start" mt={8} mb={1}>
          <Pagination count={10} color="primary" size="small" />
        </Stack>
      </Stack>
    </Card>
  );
};

DetailsListing.propTypes = DetailsListingProps;

export default DetailsListing;
