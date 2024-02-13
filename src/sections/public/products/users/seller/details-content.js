'use client';

import { Card, Container, Tab, Tabs } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/common/settings';
import { PLACEHOLDER_PROFILE_AVATAR, PLACEHOLDER_PROFILE_BANNER } from 'src/config-global';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { paths } from 'src/routes/paths';
import UserCover from 'src/sections/private/dashboard/users/common/user-cover';
import { ICONS, TabsSx } from 'src/sections/private/dashboard/users/config-users';
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
    value: 'warehouses',
    label: 'Warehouses',
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
const DetailsContent = (props) => {
  const settings = useSettingsContext();
  const { user } = props;
  const { user: authUser } = useAppSelector(selectAuth);

  const [currentTab, setCurrentTab] = useState('profile');

  // handle tab change function
  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Seller Details"
        links={[
          { name: 'Dasboard', href: paths.dashboard.root },
          { name: 'Sellers', href: paths.dashboard.users.sellers },
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

        <Tabs value={currentTab} onChange={handleChangeTab} sx={TabsSx}>
          {TABS.map((tab) => (
            <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
          ))}
        </Tabs>
      </Card>

      {currentTab === 'profile' && (
        <DetailsHome
          allowSendMessage={authUser && authUser?.id !== user.id}
          user={user}
          customerNumber={user?.customers}
          totalWarehouses={user?.warehouses?.length}
          totalSales={1500}
        />
      )}
      {currentTab === 'warehouses' && <DetailsWarehouses warehouses={user?.warehouses || []} />}
    </Container>
  );
};

DetailsContent.propTypes = Props;

export default DetailsContent;
