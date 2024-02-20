import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { alpha } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

import PropTypes from 'prop-types';
import { getSocialBrand, socials } from 'src/assets/data';
import Iconify from 'src/components/common/iconify';
import Logo from 'src/components/common/logo';

// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: 'Pages',
    children: [
      { name: 'About us', href: paths.about_us },
      { name: 'Contact us', href: paths.contact_us },
      { name: 'FAQs', href: paths.faqs },
      { name: 'Accessing your account', href: paths.accessing_account },
      { name: 'Creating an account', href: paths.create_account },
      { name: 'Subscription tiers', href: paths.subscriptions },
      { name: 'Media', href: paths.media },
      { name: 'Racklify Rating System', href: paths.rating_system },
      { name: 'Racklify Supply Chain & Logistics Definitions', href: paths.supply_chain },
    ],
  },
  {
    headline: 'Legal',
    children: [
      { name: 'Terms and Condition', href: paths.terms },
      { name: 'Privacy Policy', href: paths.privacy },
    ],
  },
  {
    headline: 'Contact',
    children: [{ name: 'support@racklify.com', href: 'mailto:support@racklify.com' }],
  },
];

const Props = {
  /** @type {SxProps} */
  sx: PropTypes.object,
};

// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
export default function Footer(props) {
  const { sx = {} } = props;
  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bgcolor: 'background.default',
        ...sx,
      }}
    >
      <Divider />

      <Container
        sx={{
          pt: 10,
          pb: 5,
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        <Logo sx={{ mb: 3 }} isLong />

        <Grid
          container
          justifyContent={{
            xs: 'center',
            md: 'space-between',
          }}
        >
          <Grid xs={8} md={3}>
            <Typography
              variant="body2"
              sx={{
                maxWidth: 270,
                mx: { xs: 'auto', md: 'unset' },
              }}
            >
              Welcome to Racklify - Your Online Logistics Hub!
            </Typography>

            <Stack
              direction="row"
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              sx={{
                mt: 3,
                mb: { xs: 5, md: 0 },
              }}
            >
              {Object.keys(socials).map((key) => {
                const social = getSocialBrand(key);

                if (!social) return null;

                return (
                  <IconButton
                    key={key}
                    href={socials[key]}
                    sx={{
                      '&:hover': {
                        bgcolor: alpha(social.color, 0.08),
                      },
                    }}
                  >
                    <Iconify color={social.color} icon={social.icon} width={social.iconSize} />
                  </IconButton>
                );
              })}
            </Stack>
          </Grid>

          <Grid xs={12} md={6}>
            <Stack spacing={5} direction={{ xs: 'column', md: 'row' }}>
              {LINKS.map((list) => (
                <Stack
                  key={list.headline}
                  spacing={2}
                  alignItems={{ xs: 'center', md: 'flex-start' }}
                  sx={{ width: 1 }}
                >
                  <Typography component="div" variant="overline">
                    {list.headline}
                  </Typography>

                  {list.children.map((link) => (
                    <MuiLink
                      key={link.name}
                      component={RouterLink}
                      href={link.href}
                      color="inherit"
                      variant="body2"
                    >
                      {link.name}
                    </MuiLink>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Typography variant="body2" sx={{ mt: 10 }}>
          © {new Date().getFullYear()}. All rights reserved
        </Typography>
      </Container>
    </Box>
  );
}

Footer.propTypes = Props;
