import PropTypes from 'prop-types';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/common/iconify';

// ----------------------------------------------------------------------

const Props = {
  backLink: PropTypes.string,
  editLink: PropTypes.string,
  liveLink: PropTypes.string,
  onChangePublish: PropTypes.func,
  isPublished: PropTypes.bool,
  sx: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const PostDetailsToolbar = (props) => {
  const { isPublished, backLink, editLink, liveLink, onChangePublish, sx, ...other } = props;
  return (
    <Stack
      spacing={1.5}
      direction="row"
      sx={{
        mb: { xs: 3, md: 5 },
        ...sx,
      }}
      {...other}
    >
      <Button
        component={RouterLink}
        href={backLink}
        startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
      >
        Back
      </Button>

      <Box sx={{ flexGrow: 1 }} />

      {isPublished && (
        <Tooltip title="Go Live">
          <IconButton component={RouterLink} href={liveLink}>
            <Iconify icon="eva:external-link-fill" />
          </IconButton>
        </Tooltip>
      )}

      <Tooltip title="Edit">
        <IconButton component={RouterLink} href={editLink}>
          <Iconify icon="solar:pen-bold" />
        </IconButton>
      </Tooltip>

      <LoadingButton
        color="inherit"
        variant="contained"
        loading={isPublished === null}
        loadingIndicator="Loading…"
        endIcon={
          isPublished ? (
            <Iconify icon="eva:cloud-upload-fill" />
          ) : (
            <Iconify icon="solar:file-text-bold" />
          )
        }
        onClick={() => onChangePublish(!isPublished)}
        sx={{ textTransform: 'capitalize' }}
      >
        {isPublished ? 'Draft' : 'Publish'}
      </LoadingButton>
    </Stack>
  );
};

PostDetailsToolbar.propTypes = Props;

export default PostDetailsToolbar;
