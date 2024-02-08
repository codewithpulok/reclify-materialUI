'use client';

import { useCallback } from 'react';

import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { useSettingsContext } from 'src/components/common/settings';

import { useRouter } from 'next/navigation';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs';
import { EmptyState, LoadingState } from 'src/components/common/custom-state';
import {
  TransactionsCustomerTable,
  TransactionsSellerTable,
  TransactionsTable,
} from 'src/components/common/custom-table';
import useHash from 'src/hooks/use-hash';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { ICONS } from './config-settings';
import Memberships from './memberships';
import SettingsService from './service';
import SettingsCustomerBillings from './settings-customer-billings';
import SettingsGeneral from './settings-general';
import SettingsKyc from './settings-kyc';
import SettingsSecurity from './settings-security';
import SettingsSellerBillings from './settings-seller-billings';
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
    label: 'Warehouses',
    icon: ICONS.warehouse(),
    roles: ['seller'],
  },
  {
    value: '#service',
    label: 'Services',
    icon: ICONS.service(),
    roles: ['seller'],
  },
  {
    value: '#billing',
    label: 'Billing',
    icon: ICONS.bills(),
    roles: ['seller', 'customer'],
  },
  {
    value: '#memberships',
    label: 'Memberships',
    icon: ICONS.membership(),
    roles: ['admin'],
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
  {
    value: '#kyc',
    label: 'KYC',
    icon: ICONS.kyc(),
    roles: ['seller', 'customer'],
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
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
      case null:
      case '#general': {
        return <SettingsGeneral />;
      }
      case '#security': {
        return <SettingsSecurity />;
      }
      case '#service': {
        switch (user?.userType) {
          case 'seller': {
            if (user?.serviceType && user?.serviceType !== 'warehouse') {
              return <SettingsService />; // service for seller
            }
            return <EmptyState />;
          }
          default:
            return <EmptyState />;
        }
      }
      case '#warehouses': {
        switch (user?.userType) {
          case 'seller': {
            return <Warehouses />; // warehouses for seller
          }
          default:
            return <EmptyState />;
        }
      }
      case '#memberships': {
        switch (user?.userType) {
          case 'admin': {
            return <Memberships />; // memberships for admin
          }
          default:
            return <EmptyState />;
        }
      }
      case '#billing': {
        switch (user?.userType) {
          case 'seller': {
            return <SettingsSellerBillings />;
          }
          case 'customer': {
            return <SettingsCustomerBillings />;
          }
          default:
            return <EmptyState />;
        }
      }
      case '#kyc': {
        switch (user?.userType) {
          case 'seller': {
            return <SettingsKyc />;
          }
          case 'customer': {
            return <SettingsKyc />;
          }
          default:
            return <EmptyState />;
        }
      }
      case '#transactions': {
        switch (user?.userType) {
          case 'seller': {
            return <TransactionsSellerTable />;
          }
          case 'customer': {
            return <TransactionsCustomerTable />;
          }
          case 'admin': {
            return <TransactionsTable />;
          }
          default:
            return <EmptyState />;
        }
      }
      case undefined:
        break;
      default:
        return <EmptyState />;
    }

    return <LoadingState text="Something is cooking" />;
  }, [currentTab, user]);

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
        value={currentTab ?? '#general'}
        onChange={handleChangeTab}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {TABS.map((tab) => {
          // filter role specific tabs
          if (tab?.roles && !tab.roles.includes(user?.userType)) return null;

          // filter service
          if (tab.value === '#warehouses' && user?.serviceType !== 'warehouse') return null;
          if (tab.value === '#service' && user?.serviceType === 'warehouse') return null;

          return <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />;
        })}
      </Tabs>

      {renderTabContents()}
    </Container>
  );
};

export default UserSettingsView;