import {
  Avatar,
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
import WarehouseAdminMenu from 'src/sections/private/dashboard/warehouses/details/warehouse-admin-menu';
import WarehouseDiamond from 'src/sections/private/dashboard/warehouses/details/warehouse-diamond';
import { joinAddressObj } from 'src/utils/address';
import { getPrimaryPhoto } from 'src/utils/photos';
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
  const { isAuthenticated } = useAppSelector(selectAuth);
  const { warehouse, onDelete = () => {}, hasControl = false, sx = {} } = props;
  const thumbnail = getPrimaryPhoto(warehouse?.photos);

  const detailsPath = isAuthenticated
    ? paths.dashboard.warehouses.details(warehouse?.id)
    : paths.warehouses.details(warehouse?.id);

  const { user } = useAppSelector(selectAuth);

  const content = (
    <Card
      className="card"
      sx={{
        ...sx,
      }}
    >
      <CardActionArea
        sx={{ bgcolor: 'background.neutral' }}
        onClick={() => router.push(detailsPath)}
      >
        <Box width="100%" sx={{ position: 'relative' }}>
          <Image src={thumbnail} ratio="16/9" />
        </Box>

        <CardContent sx={{ position: 'relative' }}>
          <Stack direction="row" alignItems="center" spacing={0.3}>
            {warehouse?.seller?.logo && (
              <Avatar src={warehouse?.seller?.logo} sx={{ width: 20, height: 20 }} />
            )}
            <Typography variant="h5">{warehouse.name}</Typography>
            {warehouse.isVerified ? (
              <Tooltip title="Verified" placement="top" arrow>
                {ICONS.verified(18, { color: 'primary.main', lineHeight: '1' })}
              </Tooltip>
            ) : null}
          </Stack>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              webkitlineclamp: '1',
              webkitboxorient: 'vertical',
            }}
          >
            {joinAddressObj(warehouse.address)}
          </Typography>

          {/* if there is a discount then show badge */}
          {!!warehouse.discountRate && (
            <Label
              color="secondary"
              variant="outlined"
              sx={{ position: 'absolute', top: 10, right: 10 }}
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

      <Stack
        sx={{
          position: 'absolute',
          top: 5,
          right: 4,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        {/* if diamond not exist then, hide this for everyone except admin */}
        {(!!warehouse?.diamond || user?.userType === 'admin') && (
          <Box
            sx={{
              bgcolor: 'action.diamond',
              borderRadius: 3,
              transition: '0.3s',
              display: 'flex',
              alignItems: 'center',
              py: 0.5,
              px: 0.5,
            }}
          >
            <WarehouseDiamond
              id={warehouse.id}
              value={warehouse?.diamond || 0}
              size={22}
              action={user?.userType === 'admin'}
            />
          </Box>
        )}

        {/* if seller user has access to the operation then show controls */}
        {hasControl && (
          <Box sx={{ bgcolor: 'grey.100', borderRadius: 5, transition: '0.3s' }}>
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
          <Box sx={{ bgcolor: 'rgba(255,255,255,1)', borderRadius: 5 }}>
            <WarehouseAdminMenu
              warehouse={warehouse}
              id={warehouse?.id}
              iconBtnProps={{ color: 'primary' }}
            />
          </Box>
        )}
      </Stack>
    </Card>
  );

  return warehouse?.isFeatured ? (
    <Box
      sx={{
        p: 0.5,
        borderRadius: 2,
      }}
      className="glow"
    >
      {content}
    </Box>
  ) : (
    content
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
          webkitlineclamp: '1',
          webkitboxorient: 'vertical',
        }}
      >
        <Skeleton />
      </Typography>
    </CardContent>
  </Card>
);
