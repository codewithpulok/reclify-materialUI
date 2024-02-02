import { Avatar, Box, Button, Chip, IconButton, Rating, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

import Label from 'src/components/common/label';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { joinAddressObj } from 'src/utils/address';
import { fShortenNumber } from 'src/utils/format-number';
import { ICONS } from '../config-warehouse';
import WarehouseAdminMenu from './warehouse-admin-menu';
import WarehouseDiamond from './warehouse-diamond';

/** @type {SxProps} */
const metadataWrapperStyle = {
  flexDirection: {
    xs: 'column',
    sm: 'row',
  },
  alignItems: {
    xs: 'stretch',
    sm: 'center',
  },
  justifyContent: {
    sm: 'space-between',
  },
  columnGap: 0.8,
  rowGap: 1,
};

const Props = {
  /** @type {Warehouse} */
  warehouse: PropTypes.object.isRequired,
};

/**
 * @param {Props} props `
 * @returns {JSX.Element}
 */
const WarehouseHeader = (props) => {
  const { user } = useAppSelector(selectAuth);
  const { warehouse } = props;
  const { name, address, isVerified, isFeatured, visible, reviews, region } = warehouse;
  const router = useRouter();

  const goToReviewSection = () => router.push('#reviews', { scroll: true });
  const goToBack = () => router.back();

  const renderMetadata = (
    <Stack sx={metadataWrapperStyle}>
      <Stack flexDirection="row" spacing={1} alignItems="center" flexWrap="wrap">
        {isVerified && (
          <Chip label="Verified" icon={ICONS.verified()} color="success" size="small" />
        )}
        {/* if user is admin then show disabled state also */}
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
        {/* if user is admin then show disabled state also */}
        {!isFeatured && user?.userType === 'admin' && (
          <Chip
            label="Not Featured"
            icon={ICONS.featured()}
            color="warning"
            disabled
            size="small"
          />
        )}

        {/* visibility property is only for admin */}
        {user?.userType === 'admin' && (
          <>
            {visible ? (
              <Chip label="Visible" icon={ICONS.visible()} color="info" size="small" />
            ) : (
              <Chip label="Hidden" icon={ICONS.invisible()} color="info" disabled size="small" />
            )}
          </>
        )}

        {/* warehouse diamonds (admin can change only) */}
        <WarehouseDiamond
          value={warehouse?.diamond}
          action={user?.userType === 'admin'}
          id={warehouse.id}
        />

        {/* warehouse average rating */}
        <Stack
          flexDirection="row"
          spacing={0.5}
          alignItems="end"
          component={Button}
          onClick={goToReviewSection}
        >
          <Rating value={3.5} readOnly precision={0.5} onClick={goToReviewSection} />
          <Typography variant="body1" lineHeight={1.3}>
            ({reviews?.length ? fShortenNumber(reviews?.length) : 0} reviews)
          </Typography>
        </Stack>
      </Stack>
      <Stack
        flexDirection="row"
        spacing={0.5}
        alignItems="center"
        flexWrap="wrap"
        justifyContent="space-between"
      >
        {/* admin action menu */}
        {user?.userType === 'admin' && (
          <WarehouseAdminMenu warehouse={warehouse} id={warehouse?.id} />
        )}
      </Stack>
    </Stack>
  );

  return (
    <Box sx={{ mb: 8 }}>
      <IconButton title="go back" onClick={goToBack} sx={{ p: 0, mb: 0.5 }}>
        {ICONS.back(32)}
      </IconButton>

      <Stack direction="row" alignItems="center" spacing={1}>
        {warehouse?.seller?.logo && <Avatar src={warehouse?.seller?.logo} />}
        <Typography variant="h2">{name}</Typography>
      </Stack>

      <Stack direction="row" spacing={1.5} alignItems="center" mb={2} flexWrap="wrap">
        <Typography variant="body2">{joinAddressObj(address)}</Typography>
        {region && <Label>{region}</Label>}
      </Stack>

      {renderMetadata}
    </Box>
  );
};

WarehouseHeader.propTypes = Props;

export default WarehouseHeader;
