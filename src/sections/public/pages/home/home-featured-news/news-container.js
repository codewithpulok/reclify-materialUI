'use client';

import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { bgGradient } from 'src/theme/css';
import { alpha } from 'src/utils/color';

/**
 * @param {NewsContainer.propTypes} props
 * @returns {JSX.Element}
 */
const NewsContainer = (props) => {
  const { children } = props;
  return (
    <Box
      sx={(theme) => ({
        textAlign: 'center',
        pt: { xs: 10, md: 15 },
        pb: { xs: 10, md: 20 },
        ...bgGradient({
          color: alpha(
            theme.palette.background.default,
            theme.palette.mode === 'light' ? 0.8 : 0.94
          ),
          imgUrl: '/assets/images/home/featured-news.jpg',
        }),
      })}
    >
      {children}
    </Box>
  );
};

NewsContainer.propTypes = {
  children: PropTypes.node,
};

export default NewsContainer;
