'use client';

import { useCallback, useState } from 'react';

import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { useSettingsContext } from 'src/components/settings';

import { getAddressesByUserId } from 'src/assets/dummy/addresses';
import { getCardsByUserId } from 'src/assets/dummy/cards';
import { getInvoicesByUserId } from 'src/assets/dummy/invoices';
import { plans } from 'src/assets/dummy/plans';
import { useAuthContext } from 'src/auth/hooks';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { ICONS } from './config-settings';
import SettingsBillings from './settings-billing';
import SettingsGeneral from './settings-general';
import SettingsSecurity from './settings-security';
import SettingsTransactions from './settings-transactions';

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

  const userInvoices = getInvoicesByUserId(user.id);
  const userAddresses = getAddressesByUserId(user.id);
  const userCards = getCardsByUserId(user.id);

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
        {TABS.map((tab) => (
          <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
        ))}
      </Tabs>

      {currentTab === 'general' && <SettingsGeneral />}

      {currentTab === 'billing' && (
        <SettingsBillings
          plans={plans}
          cards={userCards}
          invoices={userInvoices}
          addressBook={userAddresses}
        />
      )}

      {currentTab === 'transactions' && <SettingsTransactions />}

      {currentTab === 'security' && <SettingsSecurity />}
    </Container>
  );
};

export default UserSettingsView;
