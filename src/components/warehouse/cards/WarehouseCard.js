import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Image from 'src/components/image';
import { ICONS } from '../config-warehouse';

/**
 * Card for showing warehouse data
 * @component
 */
const WarehouseCard = (props) => {
  const { id, name, location, image, onDelete } = props;

  return (
    <Card
      className="card"
      sx={{
        ':hover .actions': {
          opacity: 1,
        },
      }}
    >
      <Box width="100%">
        <Image src={image} ratio="16/9" />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {location}
        </Typography>
      </CardContent>
      <Box
        className="actions"
        sx={{
          position: 'absolute',
          top: 5,
          right: 4,
          bgcolor: 'Background',
          borderRadius: 5,
          opacity: 0,
          transition: '0.3s',
        }}
      >
        <Link href={`/warehouse/${id}`}>
          <IconButton size="small" color="primary">
            {ICONS.view}
          </IconButton>
        </Link>
        <Link href={`/warehouse/${id}/edit`}>
          <IconButton size="small" color="warning">
            {ICONS.edit}
          </IconButton>
        </Link>
        <IconButton size="small" color="error" onClick={onDelete}>
          {ICONS.delete}
        </IconButton>
      </Box>
    </Card>
  );
};

WarehouseCard.propTypes = {
  /**
   * Warehouse unique id
   */
  id: PropTypes.string.isRequired,
  /**
   * Warehouse name
   */
  name: PropTypes.string.isRequired,
  /**
   * Warehouse location
   */
  location: PropTypes.string.isRequired,
  /**
   * Warehouse thumbnail
   */
  image: PropTypes.string.isRequired,
  /**
   * Warehouse delete handler
   */
  onDelete: PropTypes.func.isRequired,
};

export default WarehouseCard;
