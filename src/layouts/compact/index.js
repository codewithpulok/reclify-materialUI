import PropTypes from 'prop-types';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import { SnackbarProvider } from 'src/components/common/snackbar';
import Header from '../common/header-simple';

// ----------------------------------------------------------------------

export default function CompactLayout({ children }) {
  return (
    <SnackbarProvider>
      <Header />

      <Container component="main">
        <Stack
          sx={{
            py: 12,
            m: 'auto',
            minHeight: '100vh',
            textAlign: 'center',
            justifyContent: 'center',
            width: '100%',
            alignItems: 'center',
          }}
        >
          {children}
        </Stack>
      </Container>
    </SnackbarProvider>
  );
}

CompactLayout.propTypes = {
  children: PropTypes.node,
};
