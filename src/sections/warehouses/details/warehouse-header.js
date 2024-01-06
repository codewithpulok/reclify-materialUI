import { Box, Chip, IconButton, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

import { getWarehouseAddress } from 'src/components/warehouse/utils';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { ICONS } from '../config-warehouse';
import WarehouseAdminMenu from './warehouse-admin-menu';

const WarehouseHeaderProps = {
  name: PropTypes.string.isRequired,
  address: PropTypes.object.isRequired,
  isVerified: PropTypes.bool.isRequired,
  isFeatured: PropTypes.bool.isRequired,
};

const WarehouseHeader = (props) => {
  const auth = useAppSelector(selectAuth);
  const { name, address, isVerified, isFeatured } = props;
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
      <Typography variant="h2" sx={{ mb: 1 }}>
        {name}
      </Typography>

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
          {isFeatured && (
            <Chip label="Featured" icon={ICONS.featured()} color="warning" size="small" />
          )}

          {auth?.user?.role === 'admin' && (
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
