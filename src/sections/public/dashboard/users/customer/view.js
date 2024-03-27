'use client';

import { Button, Card, Container, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import useAppearance from 'src/redux-toolkit/features/appearance/use-appearance';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import UserCover from 'src/sections/private/dashboard/users/common/user-cover';
import { ICONS } from 'src/sections/private/dashboard/users/config-users';
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
const CustomerDetailsView = (props) => {
  const appearance = useAppearance();
  const { user } = props;
  const { user: authUser } = useAppSelector(selectAuth);

  return (
    <Container maxWidth={appearance.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Customer Details"
        links={[
          { name: 'Home', href: paths.root },
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
          avatarBottomSx={24}
        />

        <Stack sx={{ width: 1, bottom: 0, zIndex: 9, position: 'absolute' }}>
          {authUser?.id !== user.id && (
            <Button
              LinkComponent={RouterLink}
              href={`${paths.dashboard.messages.root}?id=${user.id}`}
              variant="contained"
              color="inherit"
              endIcon={ICONS.send_message()}
              sx={{
                alignSelf: {
                  xs: 'center',
                  md: 'end',
                },
                mr: {
                  xs: 0,
                  md: 2,
                },
                mb: 2,
                bgcolor: 'grey.0',
                color: 'grey.900',
                ':hover': { bgcolor: 'grey.300' },
              }}
            >
              Send Message
            </Button>
          )}
        </Stack>
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

CustomerDetailsView.propTypes = Props;

export default CustomerDetailsView;
