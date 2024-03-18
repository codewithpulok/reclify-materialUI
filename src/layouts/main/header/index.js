// mui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// components
import Logo from 'src/components/common/logo';
import HeaderContainer from './header-container';
import HeaderLinks from './header-links';

// ----------------------------------------------------------------------

export default function Header() {
  return (
    <AppBar>
      <HeaderContainer>
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          <Logo
            isLong
            containerProps={{
              sx: {
                display: {
                  xs: 'none',
                  sm: 'block',
                },
              },
            }}
          />
          <Logo
            containerProps={{
              sx: {
                display: {
                  xs: 'block',
                  sm: 'none',
                },
              },
            }}
          />
          <Box sx={{ flexGrow: 1 }} />

          <HeaderLinks />
        </Container>
      </HeaderContainer>
    </AppBar>
  );
}
