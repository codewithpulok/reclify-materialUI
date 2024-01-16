'use client';

import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { users, warehouses } from 'src/assets/dummy';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/common/settings';
import { CustomerCard, SellerCard } from 'src/components/users/cards';
import { WarehouseCard } from 'src/components/warehouse/cards';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

const Props = {};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const SearchListView = (props) => {
  const searchParam = useSearchParams();
  const query = searchParam.get('query');
  const settings = useSettingsContext();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Stack mb={5} spacing={5}>
        <CustomBreadcrumbs
          heading={`You've searched for - ${query}`}
          links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Search' }]}
        />
        <Stack mb={5} spacing={3}>
          <Typography variant="h4">Users</Typography>

          <Grid container spacing={1}>
            {users.slice(0, 4).map((user) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
                {user.userType === 'seller' && <SellerCard user={user} totalWarehouses={10} />}
                {user.userType === 'customer' && (
                  <CustomerCard user={user} totalTransactions={100} />
                )}
                {user.userType === 'admin' && <CustomerCard user={user} totalTransactions={1000} />}
              </Grid>
            ))}
          </Grid>

          <Stack direction="row" justifyContent="end" mt={5}>
            <Button
              variant="contained"
              color="primary"
              LinkComponent={RouterLink}
              href={`${paths.dashboard.search.users}?query=${query}`}
            >
              Show More
            </Button>
          </Stack>
        </Stack>

        <Stack mb={5} spacing={3}>
          <Typography variant="h4">Warehouses</Typography>

          <Grid container spacing={1.5}>
            {warehouses.slice(0, 3).map((warehouse) => (
              <Grid item key={warehouse.id} xs={12} sm={6} md={4}>
                <WarehouseCard key={warehouse.id} warehouse={warehouse} sx={{ boxShadow: 0 }} />
              </Grid>
            ))}
          </Grid>

          <Stack direction="row" justifyContent="end" mt={5}>
            <Button
              variant="contained"
              color="primary"
              LinkComponent={RouterLink}
              href={`${paths.dashboard.search.warehouses}?query=${query}`}
            >
              Show More
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

SearchListView.propTypes = Props;

export default SearchListView;
