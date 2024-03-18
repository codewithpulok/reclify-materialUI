import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import Footer from './footer';
import Header from './header';

// ----------------------------------------------------------------------

/**
 * @param {MainLayout.propTypes} props
 * @returns {JSX.Element}
 */
export default function MainLayout(props) {
  const { children, containerSx, contentSx } = props;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1, ...containerSx }}>
      <Header />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: 8, md: 10 },
          ...contentSx,
        }}
      >
        {children}
      </Box>

      <Footer />
    </Box>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node,
  /** @type {SxProps} */
  containerSx: PropTypes.object,
  /** @type {SxProps} */
  contentSx: PropTypes.object,
};
