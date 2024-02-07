import PropTypes from 'prop-types';

import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

// ----------------------------------------------------------------------

const Props = {
  sx: PropTypes.object,
  variant: PropTypes.string,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const NewsCardSkeleton = (props) => {
  const { sx, ...other } = props;

  return (
    <Stack
      component={Paper}
      variant="outlined"
      sx={{
        borderRadius: 2,
        ...sx,
      }}
      {...other}
    >
      <Stack sx={{ p: 1 }}>
        <Skeleton sx={{ paddingTop: '100%' }} />
      </Stack>

      <Stack spacing={2} direction="row" alignItems="center" sx={{ p: 3, pt: 2 }}>
        <Skeleton variant="circular" sx={{ width: 40, height: 40, flexShrink: 0 }} />
        <Stack flexGrow={1} spacing={1}>
          <Skeleton sx={{ height: 10 }} />
          <Skeleton sx={{ width: 0.5, height: 10 }} />
        </Stack>
      </Stack>
    </Stack>
  );
};

NewsCardSkeleton.propTypes = Props;
export default NewsCardSkeleton;
