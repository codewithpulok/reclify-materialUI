'use client';

import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { bgGradient } from 'src/theme/css';
import { alpha } from 'src/utils/color';

/**
 * @param {PricingContainer.propTypes} props
 * @returns {JSX.Element}
 */
const PricingContainer = (props) => {
  const { children } = props;
  return (
    <Box
      sx={(theme) => ({
        py: { xs: 10, md: 15 },
        ...bgGradient({
          color: alpha(
            theme.palette.background.default,
            theme.palette.mode === 'light' ? 0.85 : 0.94
          ),
          imgUrl: '/assets/images/home/plans.jpg',
        }),
      })}
    >
      {children}
    </Box>
  );
};

PricingContainer.propTypes = {
  children: PropTypes.node,
};

export default PricingContainer;
