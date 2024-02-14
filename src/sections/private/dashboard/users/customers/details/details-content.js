'use client';

import { Card, Container, Tab, Tabs } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import { TransactionsUserTable } from 'src/components/common/custom-table';
import { useSettingsContext } from 'src/components/common/settings';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { paths } from 'src/routes/paths';
import { fDate } from 'src/utils/format-time';
import UserCover from '../../common/user-cover';
import { ICONS, TabsSx } from '../../config-users';
import DetailsHome from './details-home';

const TABS = [
  {
    value: 'profile',
    label: 'Profile',
    icon: ICONS.profile(),
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
        heading="Customer Details"
        links={[
          { name: 'Dasboard', href: paths.dashboard.root },
          { name: 'Customers', href: paths.dashboard.users.customers },
          { name: `${user?.firstName} ${user?.lastName}` },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card sx={{ mb: 3, height: 290 }}>
        <UserCover
          joined={fDate(user.createdAt)}
          name={`${user?.firstName} ${user?.lastName}`}
          avatarUrl={user?.avatar}
          coverUrl={user?.banner}
        />

        <Tabs value={currentTab} onChange={handleChangeTab} sx={TabsSx}>
          {TABS.map((tab) => (
            <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
          ))}
        </Tabs>
      </Card>

      {currentTab === 'profile' && (
        <DetailsHome
          allowSendMessage={authUser && authUser?.id !== user.id}
          user={user}
          totalPurchase={10}
          spentMoney={user?.spent}
        />
      )}
      {currentTab === 'transactions' && <TransactionsUserTable data={user?.transactions} />}
    </Container>
  );
};

DetailsContent.propTypes = Props;

export default DetailsContent;
