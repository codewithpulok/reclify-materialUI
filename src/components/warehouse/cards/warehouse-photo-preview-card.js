import { Box, Card, CardActions, IconButton, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import Image from 'src/components/common/image';
import { ICONS } from '../config-warehouse';

const WarehousePhotoPreviewCardProps = {
  /** @type {Photo} */
  photo: PropTypes.object.isRequired,
  /** @type {(photo: Photo ) => {}} */
  onEdit: PropTypes.func.isRequired,
  /** @type {(photo: Photo ) => {}} */
  onDelete: PropTypes.func.isRequired,
};

/**
 * @param {WarehousePhotoPreviewCardProps} props
 * @returns
 */
const WarehousePhotoPreviewCard = (props) => {
  const { onEdit, onDelete, photo } = props;
  return (
    <Card sx={{ py: 0.5, px: 1.5, borderRadius: 1 }}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box sx={{ width: '40px' }}>
          <Image src={photo.coverUrl} alt={photo.title} ratio="1/1" sx={{ borderRadius: 1 }} />
        </Box>

        <Typography variant="body2" mr="auto">
          {photo.title}
        </Typography>

        <CardActions>
          <IconButton color="warning" onClick={() => onEdit(photo)}>
            {ICONS.edit()}
          </IconButton>
          <IconButton color="error" onClick={() => onDelete(photo)}>
            {ICONS.delete()}
          </IconButton>
        </CardActions>
      </Stack>
    </Card>
  );
};

WarehousePhotoPreviewCard.propTypes = WarehousePhotoPreviewCardProps;

export default WarehousePhotoPreviewCard;
