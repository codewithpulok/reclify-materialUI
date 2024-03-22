'use client';

// mui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// components
import Logo from 'src/components/common/logo';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { paths } from 'src/routes/paths';
import HeaderContainer from './header-container';
import HeaderLinks from './header-links';

// ----------------------------------------------------------------------

export default function Header() {
  const { isAuthenticated } = useAppSelector(selectAuth);

  const path = isAuthenticated ? paths.dashboard.root : paths.root;
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
            href={path}
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
            href={path}
          />
          <Box sx={{ flexGrow: 1 }} />

          <HeaderLinks />
        </Container>
      </HeaderContainer>
    </AppBar>
  );
}
