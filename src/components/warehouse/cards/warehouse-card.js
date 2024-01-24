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
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { paths } from 'src/routes/paths';
import WarehouseAdminMenu from 'src/sections/warehouses/details/warehouse-admin-menu';
import WarehouseDiamond from 'src/sections/warehouses/details/warehouse-diamond';
import { joinAddressObj } from 'src/utils/address';
import { ICONS } from '../config-warehouse';

const Props = {
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
 * @param {Props} props
 */
const WarehouseCard = (props) => {
  const router = useRouter();
  const { warehouse, onDelete = () => {}, hasControl = false, sx = {} } = props;
  const thumbnail = warehouse?.photos?.[0]?.link || 'https://placehold.co/450x318?text=Not+Found';

  const { user } = useAppSelector(selectAuth);

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
        <Box width="100%" sx={{ position: 'relative' }}>
          <Image src={thumbnail} ratio="16/9" />

          <Box
            sx={{
              position: 'absolute',
              bottom: 5,
              left: 5,
              bgcolor: 'grey.100',
              borderRadius: 3,
              transition: '0.3s',
              display: 'flex',
              alignItems: 'center',
              py: 0.5,
              px: 0.5,
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={(e) => e.stopPropagation()}
            onTouch
          >
            <WarehouseDiamond
              id={warehouse.id}
              value={warehouse?.diamond || 0}
              size={22}
              action={user?.userType === 'admin'}
            />
          </Box>
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
            {joinAddressObj(warehouse.address)}
          </Typography>

          {/* if there is a discount then show badge */}
          {!!warehouse.discountRate && (
            <Label
              color="secondary"
              variant="outlined"
              sx={{ position: 'absolute', top: 6, right: 10 }}
              startIcon={ICONS.discount()}
            >
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

      {/* if seller user has access to the operation then show controls */}
      {hasControl && (
        <Box
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

      {user?.userType === 'admin' && (
        <Box
          sx={{
            position: 'absolute',
            top: 5,
            right: 5,
            bgcolor: 'rgba(255,255,255,1)',
            borderRadius: 5,
            transition: '0.3s',
          }}
        >
          <WarehouseAdminMenu
            isVerified={warehouse?.isVerified}
            isFeatured={warehouse?.isFeatured}
            isVisible={warehouse?.visible}
            id={warehouse?.id}
            iconBtnProps={{ color: 'primary' }}
          />
        </Box>
      )}
    </Card>
  );
};

WarehouseCard.propTypes = Props;

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
