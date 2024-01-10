import { Box, Chip, IconButton, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

import { getWarehouseAddress } from 'src/components/warehouse/utils';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { ICONS } from '../config-warehouse';
import WarehouseAdminMenu from './warehouse-admin-menu';
import WarehouseDiamond from './warehouse-diamond';

const WarehouseHeaderProps = {
  name: PropTypes.string.isRequired,
  address: PropTypes.object.isRequired,
  isVerified: PropTypes.bool.isRequired,
  isFeatured: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

const WarehouseHeader = (props) => {
  const { user } = useAppSelector(selectAuth);
  const { name, address, isVerified, isFeatured, isVisible } = props;
  const router = useRouter();

  const onFeaturedChange = (value) => {
    // isFeatured = value;
  };

  const onVerifiedChange = (value) => {
    // isVerified = value;
  };

  return (
    <Box sx={{ mb: 8 }}>
      <IconButton title="go back" onClick={() => router.back()} sx={{ p: 0, mb: 0.5 }}>
        {ICONS.back(32)}
      </IconButton>
      <Stack
        sx={{
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          alignItems: {
            xs: 'start',
            sm: 'center',
          },
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h2" sx={{ mb: 1 }}>
          {name}
        </Typography>

        {/* warehouse diamond handler for admin only */}
        {user?.userType === 'admin' && <WarehouseDiamond value={5} />}
      </Stack>

      <Stack
        sx={{
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          alignItems: {
            xs: 'start',
            sm: 'center',
          },
        }}
        columnGap={0.8}
        rowGap={1}
      >
        <Typography variant="body2" mr={3}>
          {getWarehouseAddress(address)}
        </Typography>
        <Stack flexDirection="row" spacing={0.5} alignItems="center">
          {isVerified && (
            <Chip label="Verified" icon={ICONS.verified()} color="success" size="small" />
          )}
          {!isVerified && user?.userType === 'admin' && (
            <Chip
              label="Not Verified"
              icon={ICONS.verified()}
              color="success"
              disabled
              size="small"
            />
          )}

          {isFeatured && (
            <Chip label="Featured" icon={ICONS.featured()} color="warning" size="small" />
          )}
          {!isFeatured && user?.userType === 'admin' && (
            <Chip
              label="Not Featured"
              icon={ICONS.featured()}
              color="warning"
              disabled
              size="small"
            />
          )}

          {user?.userType === 'admin' && (
            <>
              {isVisible ? (
                <Chip label="Visible" icon={ICONS.visible()} color="info" size="small" />
              ) : (
                <Chip label="Hidden" icon={ICONS.invisible()} color="info" disabled size="small" />
              )}
            </>
          )}

          {user?.userType === 'admin' && (
            <WarehouseAdminMenu
              onFeaturedChange={onFeaturedChange}
              onVerifiedChange={onVerifiedChange}
              isVerified={isVerified}
              isFeatured={isFeatured}
            />
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

WarehouseHeader.propTypes = WarehouseHeaderProps;

export default WarehouseHeader;
