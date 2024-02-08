'use client';

import { Card, Container, Tab, Tabs, tabsClasses } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { membershipHistory } from 'src/assets/dummy/membership';
import { plans } from 'src/assets/dummy/plans';
import { warehouses } from 'src/assets/dummy/warehouses';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/common/settings';
import { PLACEHOLDER_PROFILE_AVATAR, PLACEHOLDER_PROFILE_BANNER } from 'src/config-global';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { paths } from 'src/routes/paths';
import { fDate } from 'src/utils/format-time';
import { ICONS } from '../../config-users';
import DetailsCover from './details-cover';
import DetailsHome from './details-home';
import DetailsListing from './details-listing';
import DetailsMembership from './details-membership';
import SellerTransactions from './details-transactions';

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
  },
  {
    value: 'transactions',
    label: 'Transactions',
    icon: ICONS.transactions(),
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
          { name: user?.id },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card sx={{ mb: 3, height: 290 }}>
        <DetailsCover
          joined={fDate(user.createdAt)}
          name={user?.displayName}
          avatarUrl={user?.avatar || PLACEHOLDER_PROFILE_AVATAR}
          coverUrl={user?.banner || PLACEHOLDER_PROFILE_BANNER}
        />

        {authUser && authUser?.userType === 'admin' && (
          <Tabs
            value={currentTab}
            onChange={handleChangeTab}
            sx={{
              width: 1,
              bottom: 0,
              zIndex: 9,
              position: 'absolute',
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
        )}
      </Card>

      {currentTab === 'profile' && (
        <DetailsHome
          allowSendMessage={authUser && authUser?.id !== user.id}
          user={user}
          customerNumber={10}
          totalWarehouses={20}
          totalSales={1500}
        />
      )}
      {currentTab === 'warehouses' && <DetailsListing warehouses={warehouses} />}
      {currentTab === 'membership' && (
        <DetailsMembership currentPlan={plans[0]} membershipHistory={membershipHistory} />
      )}
      {currentTab === 'transactions' && <SellerTransactions />}
    </Container>
  );
};

DetailsContent.propTypes = Props;

export default DetailsContent;