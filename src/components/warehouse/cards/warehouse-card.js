import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
// local components
import Image from 'src/components/common/image';
import Label from 'src/components/common/label';
import { paths } from 'src/routes/paths';
import { ICONS } from '../config-warehouse';
import { getWarehouseAddress } from '../utils';

const WarehouseCardProps = {
  /** @type {Warehouse} */
  warehouse: PropTypes.object.isRequired,
  /** @type {() => {}} */
  onDelete: PropTypes.func,
  /** @type {boolean} */
  hasControl: PropTypes.bool,
  /** @type {SxProps} */
  sx: PropTypes.object,
};
/**
 * Card for showing warehouse data
 * @param {WarehouseCardProps} props
 */
const WarehouseCard = (props) => {
  const router = useRouter();
  const { warehouse, onDelete = () => {}, hasControl = false, sx = {} } = props;
  const thumbnail =
    warehouse?.photos?.[0]?.coverUrl || 'https://placehold.co/450x318?text=Not+Found';

  return (
    <Card
      className="card"
      sx={{
        ...sx,
      }}
    >
      <CardActionArea
        onClick={() => router.push(`${paths.dashboard.warehouses.root}/${warehouse.id}`)}
      >
        <Box width="100%">
          <Image src={thumbnail} ratio="16/9" />
        </Box>
        <CardContent sx={{ position: 'relative' }}>
          <Typography gutterBottom variant="h5">
            {warehouse.name}

            {warehouse.isVerified ? (
              <Tooltip title="Verified" placement="top" arrow>
                {ICONS.verified(18, { ml: 0.3, color: 'primary.main', lineHeight: '1' })}
              </Tooltip>
            ) : null}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '1',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {getWarehouseAddress(warehouse.address)}
          </Typography>

          {/* if there is a discount then show badge */}
          {!!warehouse.discountRate && (
            <Label color="secondary" variant="soft" sx={{ position: 'absolute', top: 6, right: 6 }}>
              {warehouse.discountRate}% OFF
            </Label>
          )}
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
            bgcolor: 'grey.100',
            borderRadius: 5,
            transition: '0.3s',
          }}
        >
          <Link href={`${paths.dashboard.warehouses.create}?clone=${warehouse.id}`}>
            <IconButton size="small" color="primary">
              {ICONS.duplicate()}
            </IconButton>
          </Link>
          <Link href={`${paths.dashboard.warehouses.edit}/${warehouse.id}`}>
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

// Seketon
export const WarehouseCardSkeleton = () => (
  <Card>
    <Skeleton width="100%" variant="rounded">
      <Image ratio="16/9" />
    </Skeleton>

    <CardContent>
      <Typography gutterBottom variant="h5">
        <Skeleton />
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: '1',
          WebkitBoxOrient: 'vertical',
        }}
      >
        <Skeleton />
      </Typography>
    </CardContent>
  </Card>
);
