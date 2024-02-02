import { Box, IconButton, Stack } from '@mui/material';
import { saveAs } from 'file-saver';
import PropTypes from 'prop-types';
import FileThumbnail from '../../file-thumbnail';
import Iconify from '../../iconify';

const Props = {
  documents: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func,
  downloadAble: PropTypes.bool,
  isLoading: PropTypes.bool,
};

/**
 * @param {Props} props
 * @returns
 */
const DocumentsPreviewList = (props) => {
  const { documents = [], downloadAble, onDelete, isLoading } = props;

  const downloadFile = (link) => {
    saveAs(link);
  };

  return (
    <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">
      {documents.map((doc) => (
        <Box
          sx={{
            position: 'relative',
            width: 58,
            height: 58,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.neutral',
            borderRadius: 1,
            overflow: 'hidden',
          }}
          key={doc.id}
        >
          <FileThumbnail
            imageView
            file={doc.link}
            tooltip
            onDownload={downloadAble ? () => downloadFile(doc.link) : undefined}
          />
          {onDelete && (
            <IconButton
              size="small"
              onClick={() => onDelete(doc)}
              sx={{ position: 'absolute', top: 0, right: 0 }}
            >
              <Iconify icon="mingcute:close-line" width={14} />
            </IconButton>
          )}
        </Box>
      ))}
      {isLoading && (
        <Box
          sx={{
            width: 58,
            height: 58,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.neutral',
            borderRadius: 1,
            overflow: 'hidden',
          }}
        >
          <Iconify icon="line-md:uploading-loop" width={38} sx={{ color: 'text.secondary' }} />
        </Box>
      )}
    </Stack>
  );
};

DocumentsPreviewList.propTypes = Props;

export default DocumentsPreviewList;
