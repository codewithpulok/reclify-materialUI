'use client';

import { Button, Card, Container, Stack, Tab, Tabs, tabsClasses } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import { PLACEHOLDER_PROFILE_AVATAR, PLACEHOLDER_PROFILE_BANNER } from 'src/config-global';
import useAppearance from 'src/redux-toolkit/features/appearance/use-appearance';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import UserCover from 'src/sections/private/dashboard/users/common/user-cover';
import { ICONS } from 'src/sections/private/dashboard/users/config-users';
import DetailsHome from 'src/sections/private/dashboard/users/sellers/details/details-home';
import DetailsWarehouses from 'src/sections/private/dashboard/users/sellers/details/details-warehouses';
import { fDate } from 'src/utils/format-time';

const TABS = [
  {
    value: 'profile',
    label: 'Profile',
    icon: ICONS.profile(),
  },
  {
    value: 'services',
    label: 'Services',
    icon: ICONS.warehouse(),
  },
];

const Props = {
  /** @type {User} */
  user: PropTypes.object.isRequired,
};
/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const SellerDetailsView = (props) => {
  const appearance = useAppearance();
  const { user } = props;
  const { user: authUser } = useAppSelector(selectAuth);

  const [currentTab, setCurrentTab] = useState('profile');

  // handle tab change function
  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <Container maxWidth={appearance.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Seller Details"
        links={[
          { name: 'Home', href: paths.root },
          { name: `${user?.firstName} ${user?.lastName}` },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card sx={{ mb: 3, height: 290 }}>
        <UserCover
          joined={fDate(user.createdAt)}
          name={`${user?.firstName} ${user?.lastName}`}
          avatarUrl={user?.avatar || PLACEHOLDER_PROFILE_AVATAR}
          coverUrl={user?.banner || PLACEHOLDER_PROFILE_BANNER}
        />

        <Stack sx={{ width: 1, bottom: 0, zIndex: 9, position: 'absolute' }}>
          {authUser?.id !== user.id && (
            <Button
              LinkComponent={RouterLink}
              href={`${paths.dashboard.messages.root}?id=${user.id}`}
              variant="contained"
              color="inherit"
              endIcon={ICONS.send_message()}
              sx={{
                alignSelf: {
                  xs: 'center',
                  md: 'end',
                },
                mr: {
                  xs: 0,
                  md: 2,
                },
                mb: 2,
                bgcolor: 'grey.0',
                color: 'grey.900',
                ':hover': { bgcolor: 'grey.300' },
              }}
            >
              Send Message
            </Button>
          )}
          <Tabs
            value={currentTab}
            onChange={handleChangeTab}
            sx={{
              bgcolor: 'background.paper',
              [`& .${tabsClasses.flexContainer}`]: {
                pr: { md: 3 },
                justifyContent: {
                  sm: 'center',
                  md: 'flex-end',
                },
              },
              pl: {
                xs: 1.5,
                sm: 0,
              },
            }}
          >
            {TABS.map((tab) => (
              <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
            ))}
          </Tabs>
        </Stack>
      </Card>

      {currentTab === 'profile' && (
        <DetailsHome
          allowSendMessage={authUser && authUser?.id !== user.id}
          user={user}
          customerNumber={user?.customerCount || 0}
          totalWarehouses={user?.warehouses?.length}
          totalSales={user?.totalSales || 0}
        />
      )}
      {currentTab === 'services' && <DetailsWarehouses warehouses={user?.warehouses || []} />}
    </Container>
  );
};

SellerDetailsView.propTypes = Props;

export default SellerDetailsView;
