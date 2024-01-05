'use client';

import { Link } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
// local components
import { getSocialBrand } from 'src/assets/data/social-brands';
import { getIconify } from 'src/components/common/iconify/utilities';
import { fNumber } from 'src/utils/format-number';
import { ICONS } from '../../config-users';

// ----------------------------------------------------------------------

const DetailsHomeProps = {
  totalWarehouses: PropTypes.number,
  totalFeaturedWarehouses: PropTypes.number,
  totalVerifiedWarehouses: PropTypes.number,
  /** @type {User} */
  user: PropTypes.object,
};

/**
 * @param {DetailsHomeProps} props
 * @returns {JSX.Element}
 */
const DetailsHome = (props) => {
  const { totalFeaturedWarehouses, totalVerifiedWarehouses, totalWarehouses, user } = props;

  const renderStats = (
    <Card sx={{ py: 3, textAlign: 'center', typography: 'h4' }}>
      <Stack
        spacing={2}
        divider={<Divider orientation="horizontal" flexItem sx={{ borderStyle: 'dashed' }} />}
      >
        <Stack width={1}>
          {fNumber(totalWarehouses)}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Warehouses
          </Box>
        </Stack>

        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
        >
          <Stack width={1}>
            {fNumber(totalFeaturedWarehouses)}
            <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
              Featured
            </Box>
          </Stack>

          <Stack width={1}>
            {fNumber(totalVerifiedWarehouses)}
            <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
              Verified
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );

  const renderAbout = (
    <Card>
      <CardHeader title="About" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Box sx={{ typography: 'body2' }}>{user.about}</Box>

        <Stack direction="row" spacing={2}>
          {ICONS.address(24)}

          <Box sx={{ typography: 'body2' }}>
            {`Live at `}
            {user.country}
          </Box>
        </Stack>

        <Stack direction="row" sx={{ typography: 'body2' }} spacing={2}>
          {ICONS.email(24)}
          {user.email}
        </Stack>
      </Stack>
    </Card>
  );

  const renderSocials = (
    <Card>
      <CardHeader title="Social" />

      <Stack spacing={2} sx={{ p: 3 }}>
        {user.socials &&
          Object.keys(user.socials).map((social) => {
            const link = user.socials[social];
            const socialBrand = getSocialBrand(social);

            if (!socialBrand) return null;

            const linkArray = link.split('/');
            const username = linkArray[linkArray.length - 1];
            return (
              <Stack
                key={social}
                spacing={2}
                direction="row"
                sx={{ wordBreak: 'break-all', typography: 'body2' }}
              >
                {getIconify(socialBrand.icon, 22, {
                  flexShrink: 0,
                  color: socialBrand.color,
                })}

                <Link component={NextLink} href={link} color="inherit">
                  {username}
                </Link>
              </Stack>
            );
          })}
      </Stack>
    </Card>
  );

  return (
    <Grid container spacing={1.5}>
      <Grid xs={12} md={4}>
        {renderStats}
      </Grid>
      <Grid xs={12} md={4}>
        {renderAbout}
      </Grid>
      <Grid xs={12} md={4}>
        {renderSocials}
      </Grid>
    </Grid>
  );
};

DetailsHome.propTypes = DetailsHomeProps;
export default DetailsHome;
