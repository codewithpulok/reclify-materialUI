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
// redux
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
// routes
import { paths } from 'src/routes/paths';
// local components
import Image from 'src/components/common/image';
import Label from 'src/components/common/label';
// utils
import { joinAddressObj } from 'src/utils/address';
import { getPrimaryPhoto } from 'src/utils/photos';
import WarehouseAdminMenu from '../common/warehouse-admin-menu';
import WarehouseDiamond from '../common/warehouse-diamond';
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
  /** @type {SxProps} */
  contentSx: PropTypes.object,
  /** @type {'sm' | 'md'} */
  size: PropTypes.string,
  glow: PropTypes.bool,
};

/**
 * Card for showing warehouse data
 * @param {Props} props
 */

const WarehouseCard = (props) => {
  const {
    warehouse,
    onDelete = () => {},
    hasControl = false,
    sx = {},
    contentSx = {},
    size,
    glow = false,
  } = props;

  const router = useRouter();
  const { isAuthenticated, user } = useAppSelector(selectAuth);
  const thumbnail = getPrimaryPhoto(warehouse?.photos);

  const detailsPath = isAuthenticated
    ? paths.dashboard.warehouses.details(warehouse?.id)
    : paths.warehouses.details(warehouse?.id);

  const isSm = size === 'sm';

  return (
    <Card className={`card ${glow ? 'glow' : ''}`} sx={sx}>
      <CardActionArea
        sx={{ bgcolor: 'background.neutral' }}
        onClick={() => router.push(detailsPath)}
      >
        <Box width="100%" sx={{ position: 'relative' }}>
          <Image src={thumbnail} ratio="16/9" />
        </Box>
        <CardContent sx={{ position: 'relative', p: isSm ? 1.5 : 2, pt: 0.8, ...contentSx }}>
          <Stack spacing={0.5}>
            <Stack direction="row" justifyContent="end">
              {/* if there is a discount then show badge */}
              {!!warehouse.discountRate && (
                <Label
                  color="secondary"
                  variant="filled"
                  startIcon={ICONS.discount()}
                  sx={{ color: 'white' }}
                >
                  {warehouse.discountRate}% OFF
                </Label>
              )}
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              {warehouse.logo && (
                <Avatar
                  src={warehouse.logo}
                  sx={isSm ? { width: '48px', height: '48px' } : { width: '70px', height: '70px' }}
                />
              )}
              <Stack>
                <Stack direction="row" alignItems="center">
                  <Typography variant={isSm ? 'subtitle2' : 'h5'}>{warehouse.name}</Typography>
                  {warehouse.isVerified ? (
                    <Tooltip title="Verified" placement="top" arrow>
                      {ICONS.verified(isSm ? 16 : 18, { color: 'primary.main', lineHeight: '1' })}
                    </Tooltip>
                  ) : null}
                </Stack>
                <Typography
                  variant={isSm ? 'inherit' : 'body2'}
                  color="text.secondary"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    '-webkit-line-clamp': '2',
                    '-webkit-box-orient': 'vertical',
                    maxHeight: isSm ? '38px' : '44px',
                    height: isSm ? '38px' : '44px',
                    fontSize: isSm ? '12px' : undefined,
                    lineHeight: isSm ? 1.4 : undefined,
                  }}
                >
                  {joinAddressObj(warehouse.address)}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
      {/* Featured Badge */}
      {warehouse.isFeatured ? (
        <Tooltip title="Featured" placement="right" arrow>
          <Stack
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              color: 'grey.100',
              bgcolor: 'secondary.main',
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
              size={isSm ? 18 : 22}
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
              iconWidth={18}
              iconBtnProps={{ color: 'primary', sx: { p: isSm ? 0.5 : undefined } }}
            />
          </Box>
        )}
      </Stack>
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
