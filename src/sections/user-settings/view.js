'use client';

import { useCallback } from 'react';

import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { useSettingsContext } from 'src/components/common/settings';

import { useRouter } from 'next/navigation';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs';
import { LoadingState } from 'src/components/common/custom-state';
import useHash from 'src/hooks/use-hash';
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
    value: '#general',
    label: 'General',
    icon: ICONS.userId(),
  },
  {
    value: '#warehouses',
    label: 'My Warehouses',
    icon: ICONS.warehouse(),
  },
  {
    value: '#billing',
    label: 'Billing',
    icon: ICONS.bills(),
  },
  {
    value: '#transactions',
    label: 'Transactions',
    icon: ICONS.transactions(),
  },
  {
    value: '#security',
    label: 'Security',
    icon: ICONS.key(),
  },
];

// ----------------------------------------------------------------------

const UserSettingsView = () => {
  const settings = useSettingsContext();
  const { user } = useAppSelector(selectAuth);

  const router = useRouter();

  // fuctions for tab
  const currentTab = useHash();
  const handleChangeTab = useCallback(
    (_event, newValue) => {
      router.push(newValue);
    },
    [router]
  );
  const resetToDefaultState = useCallback(
    () => handleChangeTab(undefined, '#general'),
    [handleChangeTab]
  );

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

  // render tab contents
  const renderTabContents = useCallback(() => {
    switch (currentTab) {
      case '#general': {
        return <SettingsGeneral />;
      }
      case '#security': {
        return <SettingsSecurity />;
      }
      case '#warehouses': {
        switch (user.userType) {
          case 'seller': {
            return <Warehouses />; // warehouses for seller
          }
          default:
            resetToDefaultState();
            break;
        }
        break;
      }
      case '#billing': {
        switch (user.userType) {
          case 'seller': {
            return <SettingsSellerBillings />;
          }
          case 'customer': {
            return <SettingsCustomerBillings />;
          }
          default:
            resetToDefaultState();
            break;
        }
        break;
      }
      case '#transactions': {
        switch (user.userType) {
          case 'customer': {
            return <SettingsCustomerTransactions />;
          }
          case 'seller': {
            return <SettingsSellerTransactions />;
          }
          default:
            resetToDefaultState();
            break;
        }
        break;
      }
      default:
        resetToDefaultState();
        break;
    }

    return <LoadingState text="Something is cooking" />;
  }, [currentTab, resetToDefaultState, user]);

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
        value={currentTab ?? false}
        onChange={handleChangeTab}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {TABS.map((tab) => {
          // filter role specific tabs
          if (['admin'].includes(user?.userType) && tab.value === '#billing') return null;
          if (['admin'].includes(user?.userType) && tab.value === '#transactions') return null;
          if (['admin', 'customer'].includes(user?.userType) && tab.value === '#warehouses')
            return null;

          return <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />;
        })}
      </Tabs>

      {renderTabContents()}
    </Container>
  );
};

export default UserSettingsView;
