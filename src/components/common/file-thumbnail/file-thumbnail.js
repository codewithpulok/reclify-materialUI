import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

import DownloadButton from './download-button';
import { fileData, fileFormat, fileThumb } from './utils';

const Props = {
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  imageView: PropTypes.bool,
  fileLink: PropTypes.string,
  /** @type {SxProps} */
  imgSx: PropTypes.object,
  onDownload: PropTypes.func,
  /** @type {SxProps} */
  sx: PropTypes.object,
  tooltip: PropTypes.bool,
};

// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
export default function FileThumbnail(props) {
  const { file, tooltip, imageView, onDownload, sx, imgSx, fileLink } = props;
  const { name = '', path = '', preview = '' } = fileData(file);

  const format = fileFormat(path || preview);

  const renderDownload = (onDownload || fileLink) && (
    <DownloadButton onDownload={onDownload} fileLink={fileLink} />
  );

  const renderContent =
    format === 'image' && imageView ? (
      <Box
        component="img"
        src={preview}
        sx={{
          width: 1,
          height: 1,
          flexShrink: 0,
          objectFit: 'cover',
          ...imgSx,
        }}
      />
    ) : (
      <Box
        component="img"
        src={fileThumb(format)}
        sx={{
          width: 32,
          height: 32,
          flexShrink: 0,
          ...sx,
        }}
      />
    );

  if (tooltip) {
    return (
      <Tooltip title={name}>
        <Stack
          flexShrink={0}
          component="span"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: 'fit-content',
            height: 'inherit',
          }}
        >
          {renderContent}
          {renderDownload}
        </Stack>
      </Tooltip>
    );
  }

  return (
    <>
      {renderContent}
      {renderDownload}
    </>
  );
}

FileThumbnail.propTypes = Props;
