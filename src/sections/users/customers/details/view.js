'use client';

import { Card, Container, Tab, Tabs, tabsClasses } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { getCustomerTransactions } from 'src/assets/dummy';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/common/settings';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { paths } from 'src/routes/paths';
import { fDate } from 'src/utils/format-time';
import { ICONS } from '../../config-users';
import DetailsCover from './details-cover';
import DetailsHome from './details-home';
import DetailsPurchases from './details-purchases';

const TABS = [
  {
    value: 'profile',
    label: 'Profile',
    icon: ICONS.profile(),
  },
  {
    value: 'purchases',
    label: 'Purchases',
    icon: ICONS.purchase(),
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
const CustomerDetailsView = (props) => {
  const settings = useSettingsContext();
  const { user } = props;
  const { user: authUser } = useAppSelector(selectAuth);

  const [currentTab, setCurrentTab] = useState('profile');
  const transactions = getCustomerTransactions(user.id);

  // handle tab change function
  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Customer Details"
        links={[
          { name: 'Customer', href: paths.dashboard.users.customers },
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
          avatarUrl={user?.photoURL}
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

      {currentTab === 'profile' && <DetailsHome user={user} totalPurchase={10} spentMoney={2000} />}
      {currentTab === 'purchases' && <DetailsPurchases transactions={transactions} />}
    </Container>
  );
};

CustomerDetailsView.propTypes = Props;

export default CustomerDetailsView;
