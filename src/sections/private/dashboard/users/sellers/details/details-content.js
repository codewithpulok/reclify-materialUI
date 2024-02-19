'use client';

import { Card, Container, Tab, Tabs } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import { TransactionsUserTable } from 'src/components/common/custom-table';
import { useSettingsContext } from 'src/components/common/settings';
import { PLACEHOLDER_PROFILE_AVATAR, PLACEHOLDER_PROFILE_BANNER } from 'src/config-global';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { paths } from 'src/routes/paths';
import { fDate } from 'src/utils/format-time';
import UserCover from '../../common/user-cover';
import { ICONS, TabsSx } from '../../config-users';
import DetailsHome from './details-home';
import DetailsMembership from './details-membership';
import DetailsWarehouses from './details-warehouses';

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
  {
    value: 'membership',
    label: 'Membership',
    icon: ICONS.membership(),
    role: ['admin'],
  },
  {
    value: 'transactions',
    label: 'Transactions',
    icon: ICONS.transactions(),
    role: ['admin'],
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
          {TABS.map((tab) => {
            if (!!tab?.role && !tab.role.includes(authUser?.userType)) return null;

            return <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />;
          })}
        </Tabs>
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
      {currentTab === 'warehouses' && <DetailsWarehouses warehouses={user?.warehouses || []} />}
      {currentTab === 'membership' && (
        <DetailsMembership
          currentPlanId={user?.membership?.[0]?.planId}
          membershipHistory={user?.membership || []}
          userId={user?.id}
        />
      )}
      {currentTab === 'transactions' && <TransactionsUserTable data={user?.transactions} />}
    </Container>
  );
};

DetailsContent.propTypes = Props;

export default DetailsContent;
