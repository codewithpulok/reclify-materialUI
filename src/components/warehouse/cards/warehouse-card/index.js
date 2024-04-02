import { Avatar, Box, Card, CardContent, Stack, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
// local components
import Image from 'src/components/common/image';
import Label from 'src/components/common/label';
// utils
import TextMaxLine from 'src/components/common/text-max-line';
import { joinAddressObj } from 'src/utils/address';
import { getPrimaryPhoto } from 'src/utils/photos';
import { ICONS } from '../../config-warehouse';
import { getWarehouseDiscount } from '../../utills';
import CardActions from './card-actions';
import CardWrapper from './card-wrapper';

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
};

/**
 * Card for showing warehouse data
 * @param {Props} props
 */

const WarehouseCard = (props) => {
  const { warehouse, onDelete, hasControl, sx, contentSx, size } = props;

  const thumbnail = getPrimaryPhoto(warehouse?.photos);
  const isSm = size === 'sm';
  const discountRate = Math.ceil(getWarehouseDiscount(warehouse) || 0);

  return (
    <Card className="card" sx={sx}>
      <CardWrapper>
        <Box width="100%" sx={{ position: 'relative' }}>
          <Image src={thumbnail} ratio="16/9" />
        </Box>
        <CardContent
          sx={{
            position: 'relative',
            p: isSm ? 1.5 : 2,
            pt: 1.3,
            bgcolor: warehouse.hotRackEnabled ? 'action.hotrackBackground' : undefined,
            ...contentSx,
          }}
        >
          <Stack spacing={0.7}>
            <Stack direction="row" justifyContent="end" spacing={0.5}>
              {/* if there is a discount then show badge */}
              {warehouse?.hotRackEnabled && (
                <>
                  <Label
                    color="secondary"
                    variant="filled"
                    startIcon={ICONS.hot()}
                    sx={{ color: 'white' }}
                  >
                    HotRack
                  </Label>

                  {discountRate > 0 && (
                    <Label
                      color="secondary"
                      variant="filled"
                      startIcon={ICONS.discount()}
                      sx={{ color: 'white' }}
                    >
                      {discountRate}% OFF
                    </Label>
                  )}
                </>
              )}
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              {warehouse?.miniLogo && (
                <Avatar
                  src={warehouse?.miniLogo}
                  sx={isSm ? { width: '48px', height: '48px' } : { width: '70px', height: '70px' }}
                />
              )}
              <Stack>
                <Stack direction="row" alignItems="center">
                  <TextMaxLine variant={isSm ? 'subtitle2' : 'h5'} line={1}>
                    {warehouse.name}
                  </TextMaxLine>
                  {warehouse.isVerified ? (
                    <Tooltip title="Verified" placement="top" arrow>
                      {ICONS.verified(isSm ? 16 : 18, { color: 'primary.main', lineHeight: '1' })}
                    </Tooltip>
                  ) : null}
                </Stack>
                <TextMaxLine
                  variant={isSm ? 'inherit' : 'body2'}
                  color="text.secondary"
                  line={2}
                  sx={{
                    fontSize: isSm ? '12px' : undefined,
                  }}
                >
                  {joinAddressObj(warehouse.address)}
                </TextMaxLine>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </CardWrapper>
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

      <CardActions hasControl={hasControl} isSm={isSm} onDelete={onDelete} warehouse={warehouse} />
    </Card>
  );
};

WarehouseCard.propTypes = Props;

export default WarehouseCard;
