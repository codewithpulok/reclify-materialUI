'use client';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

import { fNumber } from 'src/utils/format-number';

import { _socials } from 'src/_mock';

import { getIconify } from 'src/components/common/iconify/utilities';
import { ICONS } from '../config-warehouse-users';

// ----------------------------------------------------------------------

const DetailsHomeProps = {
  info: PropTypes.object,
};

/**
 * @param {DetailsHomeProps} props
 * @returns {JSX.Element}
 */
const DetailsHome = (props) => {
  const { info } = props;

  const renderStats = (
    <Card sx={{ py: 3, textAlign: 'center', typography: 'h4' }}>
      <Stack
        spacing={2}
        divider={<Divider orientation="horizontal" flexItem sx={{ borderStyle: 'dashed' }} />}
      >
        <Stack width={1}>
          {fNumber(info.totalFollowers)}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Warehouses
          </Box>
        </Stack>

        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
        >
          <Stack width={1}>
            {fNumber(info.totalFollowers)}
            <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
              Featured
            </Box>
          </Stack>

          <Stack width={1}>
            {fNumber(info.totalFollowing)}
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
        <Box sx={{ typography: 'body2' }}>{info.quote}</Box>

        <Stack direction="row" spacing={2}>
          {ICONS.address(24)}

          <Box sx={{ typography: 'body2' }}>
            {`Live at `}
            <Link variant="subtitle2" color="inherit">
              {info.country}
            </Link>
          </Box>
        </Stack>

        <Stack direction="row" sx={{ typography: 'body2' }} spacing={2}>
          {ICONS.email(24)}
          {info.email}
        </Stack>
      </Stack>
    </Card>
  );

  const renderSocials = (
    <Card>
      <CardHeader title="Social" />

      <Stack spacing={2} sx={{ p: 3 }}>
        {_socials.map((link) => {
          const socialLink = info.socialLinks?.[link.value];
          if (!socialLink) return null;

          const socialLinkSplitted = socialLink.split('/');
          const username = socialLinkSplitted[socialLinkSplitted.length - 1];

          return (
            <Stack
              key={link.name}
              spacing={2}
              direction="row"
              sx={{ wordBreak: 'break-all', typography: 'body2' }}
            >
              {getIconify(link.icon, 24, {
                flexShrink: 0,
                color: link.color,
              })}

              <Link color="inherit">{username}</Link>
            </Stack>
          );
        })}
      </Stack>
    </Card>
  );

  return (
    <Grid container spacing={3}>
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
