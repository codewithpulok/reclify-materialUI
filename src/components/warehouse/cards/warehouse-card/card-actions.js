'use client';

import { Box, IconButton, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import WarehouseAdminMenu from '../../common/warehouse-admin-menu';
import WarehouseDiamond from '../../common/warehouse-diamond';
import { ICONS } from '../../config-warehouse';

/**
 * @param {CardActions.propTypes} props
 * @returns {JSX.Element}
 */
const CardActions = (props) => {
  const { warehouse, hasControl, onDelete, isSm } = props;

  const { user } = useAppSelector(selectAuth);

  return (
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
          <IconButton
            size="small"
            color="primary"
            LinkComponent={RouterLink}
            href={paths.dashboard.warehouses.clone(warehouse?.id)}
          >
            {ICONS.duplicate()}
          </IconButton>

          <IconButton
            size="small"
            color="warning"
            LinkComponent={RouterLink}
            href={paths.dashboard.warehouses.edit(warehouse?.id)}
          >
            {ICONS.edit()}
          </IconButton>

          {!!onDelete && (
            <IconButton size="small" color="error" onClick={() => onDelete(warehouse)}>
              {ICONS.delete()}
            </IconButton>
          )}
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
  );
};

CardActions.propTypes = {
  /** @type {Warehouse} */
  warehouse: PropTypes.object,
  /** @type {() => {}} */
  onDelete: PropTypes.func,
  /** @type {boolean} */
  hasControl: PropTypes.bool,
  isSm: PropTypes.bool,
};

export default CardActions;
