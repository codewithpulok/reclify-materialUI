'use client';

import { useCallback, useState } from 'react';

import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { useSettingsContext } from 'src/components/settings';

import { _userAddressBook, _userInvoices, _userPayment, _userPlans } from 'src/_mock';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import SettingsBillings from './SettingsBillings';
import SettingsGeneral from './SettingsGeneral';
import SettingsSecurity from './SettingsSecurity';
import SettingsTransactions from './SettingsTransactions';
import { ICONS } from './config-settings';

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

  const [currentTab, setCurrentTab] = useState('general');

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="User Settings"
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
          plans={_userPlans}
          cards={_userPayment}
          invoices={_userInvoices}
          addressBook={_userAddressBook}
        />
      )}

      {currentTab === 'transactions' && <SettingsTransactions />}

      {currentTab === 'security' && <SettingsSecurity />}
    </Container>
  );
};

export default UserSettingsView;
