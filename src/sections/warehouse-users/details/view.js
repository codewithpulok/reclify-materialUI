'use client';

import { Card, Container, Tab, Tabs, tabsClasses } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { _userAbout } from 'src/_mock';
import { warehouses } from 'src/assets/dummy/warehouses';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/common/settings';
import { paths } from 'src/routes/paths';
import { fDate } from 'src/utils/format-time';
import { ICONS } from '../config-warehouse-users';
import DetailsCover from './details-cover';
import DetailsHome from './details-home';
import DetailsListing from './details-listing';

const TABS = [
  {
    value: 'profile',
    label: 'Profile',
    icon: ICONS.profile,
  },
  {
    value: 'warehouses',
    label: 'Warehouses',
    icon: ICONS.warehouse,
  },
  {
    value: 'membership',
    label: 'Membership',
    icon: ICONS.membership,
  },
];

const WarehouseUsersDetailsViewProps = {
  /** @type {User} */
  user: PropTypes.object.isRequired,
};
/**
 * @param {WarehouseUsersDetailsViewProps} props
 * @returns {JSX.Element}
 */
const WarehouseUsersDetailsView = (props) => {
  const settings = useSettingsContext();
  const { user } = props;

  const [currentTab, setCurrentTab] = useState('profile');

  // handle tab change function
  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Warehouse User Details"
        links={[
          { name: 'Warehouse Users', href: paths.dashboard.warehouse_users },
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
          }}
        >
          {TABS.map((tab) => (
            <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
          ))}
        </Tabs>
      </Card>

      {currentTab === 'profile' && <DetailsHome info={_userAbout} />}
      {currentTab === 'warehouses' && <DetailsListing warehouses={warehouses} />}
    </Container>
  );
};

WarehouseUsersDetailsView.propTypes = WarehouseUsersDetailsViewProps;

export default WarehouseUsersDetailsView;
