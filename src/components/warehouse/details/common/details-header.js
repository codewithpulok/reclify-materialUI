import { Avatar, Button, Chip, IconButton, Rating, Stack, Typography, alpha } from '@mui/material';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

import Label from 'src/components/common/label';
import { PLACEHOLDER_PROFILE_BANNER } from 'src/config-global';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { bgGradient } from 'src/theme/css';
import { joinAddressObj } from 'src/utils/address';
import { fShortenNumber } from 'src/utils/format-number';
import WarehouseAdminMenu from '../../common/warehouse-admin-menu';
import WarehouseDiamond from '../../common/warehouse-diamond';
import { ICONS } from '../../config-warehouse';

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
  bgcolor: (theme) => alpha(theme.palette.background.default, 0.4),
  px: 1,
  py: 0.2,
  borderRadius: 0.9,
};

const Props = {
  /** @type {Warehouse} */
  warehouse: PropTypes.object.isRequired,
  hideBack: PropTypes.bool,
};

/**
 * @param {Props} props `
 * @returns {JSX.Element}
 */
const WarehouseHeader = (props) => {
  const { warehouse, hideBack } = props;
  const { user } = useAppSelector(selectAuth);
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
            variant="filled"
          />
        )}

        {isFeatured && (
          <Chip
            label="Featured"
            icon={ICONS.featured()}
            color="secondary"
            size="small"
            sx={{ color: 'white' }}
          />
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
          <Rating
            value={warehouse?.averageRating || 0}
            readOnly
            precision={0.5}
            onClick={goToReviewSection}
          />
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
    <Stack
      alignItems="start"
      sx={(theme) => ({
        ...bgGradient({
          color: alpha(
            theme.palette.background.default,
            theme.palette.mode === 'light' ? 0.8 : 0.94
          ),
          imgUrl: warehouse?.banner || PLACEHOLDER_PROFILE_BANNER,
        }),
        px: 2,
        py: 2,
        minHeight: '250px',
        mb: 3,
        borderRadius: 1,
      })}
    >
      {!hideBack && (
        <IconButton title="go back" onClick={goToBack} sx={{ p: 0, mb: 0.5 }}>
          {ICONS.back(32)}
        </IconButton>
      )}

      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        alignItems={{
          xs: 'start',
          sm: 'center',
        }}
        spacing={1}
        mt="auto"
      >
        {warehouse?.logo && <Avatar src={warehouse?.logo} sx={{ height: '90px', width: '90px' }} />}
        <Stack>
          <Typography variant="h2">{name}</Typography>
          <Stack direction="row" spacing={1} alignItems="center" mb={2} flexWrap="wrap">
            <Typography variant="body2">{joinAddressObj(address)}</Typography>
            {region && <Label>{region}</Label>}
          </Stack>
        </Stack>
      </Stack>

      {renderMetadata}
    </Stack>
  );
};

WarehouseHeader.propTypes = Props;

export default WarehouseHeader;
