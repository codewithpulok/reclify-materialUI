import { Box, Card, CardActions, IconButton, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { getIconify } from 'src/components/common/iconify/utilities';
import Image from 'src/components/common/image';
import { ICONS } from '../config-warehouse';

const WarehousePhotoPreviewCardProps = {
  /** @type {Photo} */
  photo: PropTypes.object,
  /** @type {(photo: Photo ) => {}} */
  onEdit: PropTypes.func,
  /** @type {(photo: Photo ) => {}} */
  onDelete: PropTypes.func,
  isLoading: PropTypes.bool,
};

/**
 * @param {WarehousePhotoPreviewCardProps} props
 * @returns
 */
const WarehousePhotoPreviewCard = (props) => {
  const { onEdit, onDelete, photo, isLoading = false } = props;
  return (
    <Card sx={{ py: 0.5, px: 1.5, borderRadius: 1 }}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box sx={{ width: '40px', position: 'relative' }}>
          <Image src={photo.link} alt={photo.title} ratio="1/1" sx={{ borderRadius: 1 }} />
          {isLoading ? (
            <Stack
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(0,0,0,0.5)',
                borderRadius: 1,
              }}
            >
              {getIconify('solar:cloud-upload-line-duotone', 28, { color: '#fff' })}
            </Stack>
          ) : null}
        </Box>

        <Typography variant="body2" mr="auto">
          {photo.title}
        </Typography>

        {!isLoading && (
          <CardActions>
            <IconButton color="warning" onClick={() => onEdit(photo)}>
              {ICONS.edit()}
            </IconButton>
            <IconButton color="error" onClick={() => onDelete(photo)}>
              {ICONS.delete()}
            </IconButton>
          </CardActions>
        )}
      </Stack>
    </Card>
  );
};

WarehousePhotoPreviewCard.propTypes = WarehousePhotoPreviewCardProps;

export default WarehousePhotoPreviewCard;
