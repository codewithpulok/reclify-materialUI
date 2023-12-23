import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import Image from 'src/components/common/image';
import { ICONS } from '../config-warehouse';
import { getWarehouseAddress } from '../utils';

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
        minHeight: '100%',
        ':hover .actions': {
          opacity: 1,
        },
      }}
    >
      <CardActionArea
        onClick={() => router.push(`/warehouse/${warehouse.id}`)}
        sx={{ minHeight: '100%' }}
      >
        <Box width="100%">
          <Image src={warehouse?.photos[0]?.coverUrl} ratio="16/9" />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5">
            {warehouse.name}

            {warehouse.isVerified ? (
              <Tooltip title="Verified" placement="top" arrow>
                {ICONS.verified(18, { ml: 0.3, color: 'primary.main', lineHeight: '1' })}
              </Tooltip>
            ) : null}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {getWarehouseAddress(warehouse.address)}
          </Typography>
        </CardContent>

        {/* Featured Badge */}
        {warehouse.isFeatured ? (
          <Tooltip title="Featured" placement="right" arrow>
            <Stack
              sx={{
                position: 'absolute',
                top: 10,
                left: 10,
                color: 'grey.100',
                bgcolor: 'warning.main',
                width: '30px',
                height: '30px',
                borderRadius: 1,
              }}
              alignItems="center"
              justifyContent="center"
            >
              {ICONS.featured(28)}
            </Stack>
          </Tooltip>
        ) : null}
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
