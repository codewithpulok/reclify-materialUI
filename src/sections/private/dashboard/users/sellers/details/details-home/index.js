'use client';

import { CardContent, Link, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import PropTypes from 'prop-types';
// local components
import { socialsBrands } from 'src/assets/data/social-brands';
import { getIconify } from 'src/components/common/iconify/utilities';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import HomeAdminControl from './home-admin-control';

// ----------------------------------------------------------------------

const DetailsHomeProps = {
  // totalWarehouses: PropTypes.number,
  // customerNumber: PropTypes.number,
  // totalSales: PropTypes.number,
  /** @type {User} */
  user: PropTypes.object,
};

/**
 * @param {DetailsHomeProps} props
 * @returns {JSX.Element}
 */
const DetailsHome = (props) => {
  const { user } = props;
  const { user: authUser } = useAppSelector(selectAuth);

  const renderAbout = (
    <Card>
      <CardHeader title="About Provider:" />
      <CardContent>
        <Typography>{user?.about}</Typography>
      </CardContent>
    </Card>
  );

  const renderInfo = (
    <Card>
      <CardContent component={Stack} spacing={2}>
        <Stack direction="row" spacing={1}>
          <Typography variant="subtitle2">Company Name:</Typography>
          <Typography variant="body2">{user?.company || ''}</Typography>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Typography variant="subtitle2">Website:</Typography>
          {user?.website && <Link href={user?.website}>{user?.website}</Link>}
        </Stack>

        <Stack direction="row" spacing={1}>
          <Typography variant="subtitle2">Phone Number:</Typography>
          <Typography variant="body2">{user?.phone || ''}</Typography>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Typography variant="subtitle2">Email:</Typography>
          <Typography variant="body2">{user?.email || ''}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );

  const renderSocials = (
    <Card>
      <CardHeader title="Social Channels:" />

      <Stack spacing={2} sx={{ p: 3 }}>
        {socialsBrands.map((social) => {
          const link = user?.socials?.[social.key] || null;

          const linkArray = link ? link.split('/') : null;
          const username = link ? linkArray[linkArray.length - 1] : null;
          return (
            <Stack
              key={social.key}
              spacing={2}
              direction="row"
              sx={{ wordBreak: 'break-all', typography: 'body2' }}
            >
              {getIconify(social.icon, social.iconSize, {
                flexShrink: 0,
                color: social.color,
              })}

              {link ? (
                <Link href={link} color="inherit">
                  {username}
                </Link>
              ) : (
                'Not Available'
              )}
            </Stack>
          );
        })}
      </Stack>
    </Card>
  );

  return (
    <Grid container spacing={1.5}>
      <Grid xs={12} md={4}>
        <Stack spacing={1.5}>
          {renderAbout}
          {authUser?.userType === 'admin' && <HomeAdminControl user={user} />}
        </Stack>
      </Grid>
      <Grid xs={12} md={4}>
        {renderInfo}
      </Grid>
      <Grid xs={12} md={4}>
        {renderSocials}
      </Grid>
    </Grid>
  );
};

DetailsHome.propTypes = DetailsHomeProps;
export default DetailsHome;
