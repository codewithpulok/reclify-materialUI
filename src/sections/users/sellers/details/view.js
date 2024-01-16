'use client';

import { Card, Container, Tab, Tabs, tabsClasses } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { membershipHistory } from 'src/assets/dummy/membership';
import { plans } from 'src/assets/dummy/plans';
import { warehouses } from 'src/assets/dummy/warehouses';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/common/settings';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { paths } from 'src/routes/paths';
import { fDate } from 'src/utils/format-time';
import { ICONS } from '../../config-users';
import DetailsCover from './details-cover';
import DetailsHome from './details-home';
import DetailsListing from './details-listing';
import DetailsMembership from './details-membership';

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
          { name: 'Sellers', href: paths.dashboard.users.sellers },
          { name: user?.displayName },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card sx={{ mb: 3, height: 290 }}>
        <DetailsCover
          joined={fDate(user.createdAt)}
          name={user?.displayName}
          avatarUrl={user?.avatar}
          coverUrl="https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_4.jpg"
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
        <DetailsHome user={user} customerNumber={10} totalWarehouses={20} totalSales={1500} />
      )}
      {currentTab === 'warehouses' && <DetailsListing warehouses={warehouses} />}
      {currentTab === 'membership' && (
        <DetailsMembership currentPlan={plans[0]} membershipHistory={membershipHistory} />
      )}
    </Container>
  );
};

SellerDetailsView.propTypes = Props;

export default SellerDetailsView;
