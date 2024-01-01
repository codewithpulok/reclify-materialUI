'use client';

import { useCallback, useState } from 'react';

import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { useSettingsContext } from 'src/components/common/settings';

import { useAuthContext } from 'src/auth/hooks';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs';
import { ICONS } from './config-settings';
import SettingsCustomerBillings from './settings-customer-billings';
import SettingsCustomerTransactions from './settings-customer-transactions';
import SettingsGeneral from './settings-general';
import SettingsSecurity from './settings-security';
import SettingsSellerBillings from './settings-seller-billings';
import SettingsSellerTransactions from './settings-seller-transactions';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'general',
    label: 'General',
    icon: ICONS.userId(),
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
  const { user } = useAuthContext();

  const [currentTab, setCurrentTab] = useState('general');

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  // choosing the page heading according to user role
  let headingPrefix = null;
  switch (user?.role) {
    case 'customer': {
      headingPrefix = 'Customer Account';
      break;
    }
    case 'admin': {
      headingPrefix = 'Admin Account';
      break;
    }
    case 'warehouse': {
      headingPrefix = 'Warehouse Account';
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
          // exclude warehouse only tabs
          if (!['warehouse', 'customer'].includes(user?.role) && tab.value === 'billing')
            return null;
          if (!['warehouse', 'customer'].includes(user?.role) && tab.value === 'transactions')
            return null;

          return <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />;
        })}
      </Tabs>

      {currentTab === 'general' && <SettingsGeneral />}

      {currentTab === 'billing' && (
        <>
          {user?.role === 'warehouse' && <SettingsSellerBillings />}
          {user?.role === 'customer' && <SettingsCustomerBillings />}
        </>
      )}

      {currentTab === 'transactions' && (
        <>
          {user?.role === 'warehouse' && <SettingsSellerTransactions />}
          {user?.role === 'customer' && <SettingsCustomerTransactions />}
        </>
      )}

      {currentTab === 'security' && <SettingsSecurity />}
    </Container>
  );
};

export default UserSettingsView;
