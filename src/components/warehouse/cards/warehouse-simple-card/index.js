import { Box, Card, CardContent, Stack } from '@mui/material';
import PropTypes from 'prop-types';
// local components
import Image from 'src/components/common/image';
// utils
import TextMaxLine from 'src/components/common/text-max-line';
import { joinAddressObj } from 'src/utils/address';
import { getPrimaryPhoto } from 'src/utils/photos';
import CardWrapper from './card-wrapper';

const Props = {
  /** @type {Warehouse} */
  warehouse: PropTypes.object.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
  /** @type {SxProps} */
  contentSx: PropTypes.object,
};

/**
 * @param {Props} props
 */

const WarehouseSimpleCard = (props) => {
  const { warehouse, sx, contentSx } = props;

  const thumbnail = getPrimaryPhoto(warehouse?.photos);

  return (
    <Card sx={sx}>
      <CardWrapper warehouse={warehouse}>
        <Box width="100%" sx={{ position: 'relative' }}>
          <Image src={thumbnail} ratio="16/9" />
        </Box>
        <CardContent sx={{ position: 'relative', p: 1.5, pt: 1.3, ...contentSx }}>
          <Stack spacing={0.5}>
            <TextMaxLine variant="subtitle2" line={1}>
              {warehouse.name}
            </TextMaxLine>
            <TextMaxLine variant="caption" color="text.secondary" line={2}>
              {joinAddressObj(warehouse.address)}
            </TextMaxLine>
          </Stack>
        </CardContent>
      </CardWrapper>
    </Card>
  );
};

WarehouseSimpleCard.propTypes = Props;

export default WarehouseSimpleCard;
