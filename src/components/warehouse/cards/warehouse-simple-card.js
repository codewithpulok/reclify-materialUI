import { Box, Card, CardActionArea, CardContent, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
// redux
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
// routes
import { paths } from 'src/routes/paths';
// local components
import Image from 'src/components/common/image';
// utils
import TextMaxLine from 'src/components/common/text-max-line';
import { joinAddressObj } from 'src/utils/address';
import { getPrimaryPhoto } from 'src/utils/photos';

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
  const {
    warehouse,

    sx,
    contentSx,
  } = props;

  const router = useRouter();
  const { isAuthenticated } = useAppSelector(selectAuth);
  const thumbnail = getPrimaryPhoto(warehouse?.photos);

  const detailsPath = isAuthenticated
    ? paths.dashboard.warehouses.details(warehouse?.id)
    : paths.warehouses.details(warehouse?.id);

  return (
    <Card sx={sx}>
      <CardActionArea
        sx={{ bgcolor: 'background.neutral' }}
        onClick={() => router.push(detailsPath)}
      >
        <Box width="100%" sx={{ position: 'relative' }}>
          <Image src={thumbnail} ratio="16/9" />
        </Box>
        <CardContent sx={{ position: 'relative', p: 2, pt: 1.3, ...contentSx }}>
          <Stack spacing={0.7}>
            <TextMaxLine variant="h5" line={1}>
              {warehouse.name}
            </TextMaxLine>
            <TextMaxLine variant="body2" color="text.secondary" line={2} sx={{ height: '44px' }}>
              {joinAddressObj(warehouse.address)}
            </TextMaxLine>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

WarehouseSimpleCard.propTypes = Props;

export default WarehouseSimpleCard;
