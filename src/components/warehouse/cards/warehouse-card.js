import { Box, Card, CardActionArea, CardContent, IconButton, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import Image from 'src/components/image';
import { ICONS } from '../config-warehouse';

const WarehouseCardProps = {
  /** @type {Warehouse} */
  warehouse: PropTypes.object.isRequired,
  /** @type {() => {}} */
  onDelete: PropTypes.func.isRequired,
  /** @type {boolean} */
  hasControl: PropTypes.bool.isRequired,
};
/**
 * Card for showing warehouse data
 * @param {WarehouseCardProps} props
 */
const WarehouseCard = (props) => {
  const router = useRouter();
  const { warehouse, onDelete, hasControl } = props;

  return (
    <Card
      className="card"
      sx={{
        ':hover .actions': {
          opacity: 1,
        },
      }}
    >
      <CardActionArea onClick={() => router.push(`/warehouse/${warehouse.id}`)}>
        <Box width="100%">
          <Image src={warehouse?.photos[0]?.coverUrl} ratio="16/9" />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5">
            {warehouse.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {warehouse.location}
          </Typography>
        </CardContent>
      </CardActionArea>

      {/* if loggedin user has access to the operation then show controls */}
      {hasControl && (
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
          <Link href={`/warehouse/create?clone=${warehouse.id}`}>
            <IconButton size="small" color="primary">
              {ICONS.duplicate()}
            </IconButton>
          </Link>
          <Link href={`/warehouse/${warehouse.id}/edit`}>
            <IconButton size="small" color="warning">
              {ICONS.edit()}
            </IconButton>
          </Link>
          <IconButton size="small" color="error" onClick={onDelete}>
            {ICONS.delete()}
          </IconButton>
        </Box>
      )}
    </Card>
  );
};

WarehouseCard.propTypes = WarehouseCardProps;

export default WarehouseCard;
