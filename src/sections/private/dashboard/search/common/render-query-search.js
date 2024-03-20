import { Button, Grid, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { EmptyState, ErrorState, LoadingState } from 'src/components/common/custom-state';
import { ServiceCard } from 'src/components/service/cards';
import { CustomerCard, SellerCard } from 'src/components/users/cards';
import { WarehouseCard } from 'src/components/warehouse/cards';
import { RouterLink } from 'src/routes/components';

/**
 * @param {RenderServices.propTypes} props
 * @returns {JSX.Element}
 */
const RenderServices = (props) => {
  const { data, isError, isLoading, isSuccess } = props;

  if (!isLoading && isError) {
    return <ErrorState />;
  }

  if (!isLoading && isSuccess && !data?.length) {
    return <EmptyState />;
  }

  if (!isLoading && isSuccess && data?.length) {
    return (
      <Grid container spacing={1}>
        {data.slice(0, 3).map((service) => (
          <Grid item key={service.id} xs={12} sm={6} md={4}>
            <ServiceCard key={service.id} service={service} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return <LoadingState />;
};

RenderServices.propTypes = {
  /** @type {Service[]} */
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  isSuccess: PropTypes.bool,
};

// ----------------------------------------------------------------------

/**
 * @param {RenderWarehouses.propTypes} props
 * @returns {JSX.Element}
 */
const RenderWarehouses = (props) => {
  const { data, isError, isLoading, isSuccess } = props;

  if (!isLoading && isError) {
    return <ErrorState />;
  }

  if (!isLoading && isSuccess && !data?.length) {
    return <EmptyState />;
  }

  if (!isLoading && isSuccess && data?.length) {
    return (
      <Grid container spacing={1}>
        {data.slice(0, 3).map((warehouse) => (
          <Grid item key={warehouse.id} xs={12} sm={6} md={4}>
            <WarehouseCard key={warehouse.id} warehouse={warehouse} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return <LoadingState />;
};

RenderWarehouses.propTypes = {
  /** @type {Warehouse[]} */
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  isSuccess: PropTypes.bool,
};

// ----------------------------------------------------------------------

/**
 * @param {RenderUsers.propTypes} props
 * @returns {JSX.Element}
 */
const RenderUsers = (props) => {
  const { data, isError, isLoading, isSuccess } = props;

  if (!isLoading && isError) {
    return <ErrorState />;
  }

  if (!isLoading && isSuccess && !data?.length) {
    return <EmptyState />;
  }

  if (!isLoading && isSuccess && data?.length) {
    return (
      <Grid container spacing={1}>
        {data.slice(0, 4).map((user) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
            {user.userType === 'seller' && (
              <SellerCard user={user} serviceCount={user?.serviceCount} />
            )}
            {user.userType === 'customer' && (
              <CustomerCard user={user} totalTransactions={user?.transactionCount} />
            )}
          </Grid>
        ))}
      </Grid>
    );
  }

  return <LoadingState />;
};

RenderUsers.propTypes = {
  /** @type {User[]} */
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  isSuccess: PropTypes.bool,
};

// ----------------------------------------------------------------------

/**
 * @param {RenderQuerySearch.propTypes} props
 * @returns {JSX.Element}
 */
const RenderQuerySearch = (props) => {
  const { data, servicesPath, usersPath, warehousesPath, ...other } = props;

  return (
    <>
      <Stack spacing={3}>
        <Typography variant="h4">Users</Typography>

        <RenderUsers data={data?.users} {...other} />

        <Stack direction="row" justifyContent="end">
          {!!data?.users && (
            <Button variant="contained" color="primary" LinkComponent={RouterLink} href={usersPath}>
              Show More
            </Button>
          )}
        </Stack>
      </Stack>

      <Stack spacing={3}>
        <Typography variant="h4">Warehouses</Typography>

        <RenderWarehouses data={data?.warehouses} {...other} />

        <Stack direction="row" justifyContent="end">
          {!!data?.warehouses && (
            <Button
              variant="contained"
              color="primary"
              LinkComponent={RouterLink}
              href={warehousesPath}
            >
              Show More
            </Button>
          )}
        </Stack>
      </Stack>

      <Stack spacing={3}>
        <Typography variant="h4">Services</Typography>

        <RenderServices data={data?.services} {...other} />

        <Stack direction="row" justifyContent="end">
          {!!data?.services && (
            <Button
              variant="contained"
              color="primary"
              LinkComponent={RouterLink}
              href={servicesPath}
            >
              Show More
            </Button>
          )}
        </Stack>
      </Stack>
    </>
  );
};

RenderQuerySearch.propTypes = {
  data: PropTypes.shape({
    /** @type {User[]} */
    users: PropTypes.array,
    /** @type {Warehouse[]} */
    warehouses: PropTypes.array,
    /** @type {Service[]} */
    services: PropTypes.array,
  }),
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  isSuccess: PropTypes.bool,

  usersPath: PropTypes.string.isRequired,
  warehousesPath: PropTypes.string.isRequired,
  servicesPath: PropTypes.string.isRequired,
};

export default RenderQuerySearch;
