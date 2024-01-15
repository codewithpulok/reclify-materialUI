'use client';

import { Container, Grid, Pagination, Stack } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { users } from 'src/assets/dummy';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/common/settings';
import { CustomerCard, SellerCard } from 'src/components/users/cards';
import { paths } from 'src/routes/paths';

const Props = {};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const SearchUsersView = (props) => {
  const searchParam = useSearchParams();
  const query = searchParam.get('query');
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Stack mb={5} spacing={5}>
        <CustomBreadcrumbs
          heading={`You've searched for - ${query}`}
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Search', href: paths.dashboard.search.root },
            { name: 'Users' },
          ]}
        />

        <Grid container spacing={1}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
              {user.userType === 'seller' && <SellerCard user={user} totalWarehouses={10} />}
              {user.userType === 'customer' && <CustomerCard user={user} />}
              {user.userType === 'admin' && <CustomerCard user={user} />}
            </Grid>
          ))}
        </Grid>

        <Stack direction="row" justifyContent="center" mt={3} mb={1}>
          <Pagination count={10} color="primary" size="small" />
        </Stack>
      </Stack>
    </Container>
  );
};

SearchUsersView.propTypes = Props;

export default SearchUsersView;
