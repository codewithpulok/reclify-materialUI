import { Button, Stack } from '@mui/material';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { navConfig } from '../config-navigation';
import NavMobile from '../nav/mobile';
import HeaderAccount from './header-account';

const HeaderLinks = (props) => (
  <>
    <Stack alignItems="center" direction="row" gap={0.5}>
      <Stack
        alignItems="center"
        direction="row"
        gap={0.5}
        sx={{ display: { xs: 'none', md: 'flex' } }}
      >
        <Button
          LinkComponent={RouterLink}
          href={paths.news.root}
          variant="outlined"
          color="primary"
        >
          Racklify News
        </Button>
        <Button
          LinkComponent={RouterLink}
          href={paths.contact_us}
          variant="outlined"
          color="primary"
        >
          Contact Us
        </Button>
      </Stack>

      <HeaderAccount />
    </Stack>
    <NavMobile
      data={navConfig}
      actionSx={{
        display: {
          md: 'none',
        },
      }}
    />
  </>
);

HeaderLinks.propTypes = {};

export default HeaderLinks;
