import PropTypes from 'prop-types';

import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

const Props = {
  sx: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const NewsHorizontalCardSkeleton = (props) => {
  const { sx, ...other } = props;
  const smUp = useResponsive('up', 'sm');

  return (
    <Stack
      component={Paper}
      direction="row"
      variant="outlined"
      sx={{
        borderRadius: 2,
        ...sx,
      }}
      {...other}
    >
      <Stack spacing={2} flexGrow={1} sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
          <Skeleton sx={{ width: 24, height: 12 }} />
        </Stack>

        <Skeleton sx={{ width: 1, height: 10 }} />
        <Skeleton sx={{ width: `calc(100% - 40px)`, height: 10 }} />
        <Skeleton sx={{ width: `calc(100% - 80px)`, height: 10 }} />
      </Stack>

      {smUp && (
        <Stack sx={{ p: 1 }}>
          <Skeleton sx={{ width: 170, height: 240, flexShrink: 0 }} />
        </Stack>
      )}
    </Stack>
  );
};

NewsHorizontalCardSkeleton.propTypes = Props;
export default NewsHorizontalCardSkeleton;
