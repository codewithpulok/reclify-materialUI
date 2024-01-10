'use client';

import { useCallback, useState } from 'react';

import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { useSettingsContext } from 'src/components/common/settings';

import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { ICONS } from './config-settings';
import SettingsCustomerBillings from './settings-customer-billings';
import SettingsCustomerTransactions from './settings-customer-transactions';
import SettingsGeneral from './settings-general';
import SettingsSecurity from './settings-security';
import SettingsSellerBillings from './settings-seller-billings';
import SettingsSellerTransactions from './settings-seller-transactions';
import Warehouses from './settings-seller-warehouses';

// ----------------------------------------------------------------------

export const TABS = [
  {
    value: 'general',
    label: 'General',
    icon: ICONS.userId(),
  },
  {
    value: 'warehouses',
    label: 'My Warehouses',
    icon: ICONS.warehouse(),
  },
  {
    value: 'billing',
    label: 'Billing',
    icon: ICONS.bills(),
  },
  {
    value: 'transactions',
    label: 'Transactions',
    icon: ICONS.transactions(),
  },
  {
    value: 'security',
    label: 'Security',
    icon: ICONS.key(),
  },
];

// ----------------------------------------------------------------------

const UserSettingsView = () => {
  const settings = useSettingsContext();
  const { user } = useAppSelector(selectAuth);

  const [currentTab, setCurrentTab] = useState('general');

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  // choosing the page heading according to user role
  let headingPrefix = null;
  switch (user?.userType) {
    case 'customer': {
      headingPrefix = 'Customer Account';
      break;
    }
    case 'admin': {
      headingPrefix = 'Admin Account';
      break;
    }
    case 'seller': {
      headingPrefix = 'Seller Account';
      break;
    }
    default: {
      headingPrefix = 'Account';
      break;
    }
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={`${headingPrefix} Settings`}
        links={[{ name: 'Settings' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Tabs
        value={currentTab}
        onChange={handleChangeTab}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {TABS.map((tab) => {
          // filter role specific tabs
          if (['admin'].includes(user?.userType) && tab.value === 'billing') return null;
          if (['admin'].includes(user?.userType) && tab.value === 'transactions') return null;
          if (['admin', 'customer'].includes(user?.userType) && tab.value === 'warehouses')
            return null;

          return <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />;
        })}
      </Tabs>

      {currentTab === 'general' && <SettingsGeneral />}

      {currentTab === 'warehouses' && <Warehouses />}

      {currentTab === 'billing' && (
        <>
          {user?.userType === 'seller' && <SettingsSellerBillings />}
          {user?.userType === 'customer' && <SettingsCustomerBillings />}
        </>
      )}

      {currentTab === 'transactions' && (
        <>
          {user?.userType === 'seller' && <SettingsSellerTransactions />}
          {user?.userType === 'customer' && <SettingsCustomerTransactions />}
        </>
      )}

      {currentTab === 'security' && <SettingsSecurity />}
    </Container>
  );
};

export default UserSettingsView;
