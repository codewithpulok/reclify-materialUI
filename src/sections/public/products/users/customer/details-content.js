'use client';

import { Card, Container } from '@mui/material';
import PropTypes from 'prop-types';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import useAppearance from 'src/redux-toolkit/features/appearance/use-appearance';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { paths } from 'src/routes/paths';
import UserCover from 'src/sections/private/dashboard/users/common/user-cover';
import DetailsHome from 'src/sections/private/dashboard/users/customers/details/details-home';
import { fDate } from 'src/utils/format-time';

const Props = {
  /** @type {User} */
  user: PropTypes.object.isRequired,
};
/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const DetailsContent = (props) => {
  const appearance = useAppearance();
  const { user } = props;
  const { user: authUser } = useAppSelector(selectAuth);

  return (
    <Container maxWidth={appearance.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Customer Details"
        links={[
          { name: 'Dasboard', href: paths.dashboard.root },
          { name: 'Merchants', href: paths.dashboard.users.customers },
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
      </Card>

      <DetailsHome
        allowSendMessage={authUser && authUser?.id !== user.id}
        user={user}
        totalPurchase={10}
        spentMoney={user?.spent}
      />
    </Container>
  );
};

DetailsContent.propTypes = Props;

export default DetailsContent;
