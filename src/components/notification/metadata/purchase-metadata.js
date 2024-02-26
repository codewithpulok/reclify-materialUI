import { Box, Card, Link, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import Image from 'src/components/common/image';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { fNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------

const Props = {
  warehouseId: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  pallets: PropTypes.number,
};

// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const PurchaseMetadata = (props) => {
  const { image, pallets, title, warehouseId } = props;

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'start',
        flexWrap: 'wrap',
        borderRadius: 1,
        gap: 1,
        py: 0.6,
        px: 0.8,
      }}
    >
      {!!image && (
        <Box width="50px" height="50px" position="relative">
          <Image src={image} ratio="1/1" sx={{ borderRadius: 1 }} />
        </Box>
      )}
      <Stack>
        <Link component={RouterLink} href={paths.dashboard.warehouses.details(warehouseId)}>
          <Typography variant="subtitle2" color="text.primary">
            {title || 'Unknown'}
          </Typography>
        </Link>
        <Typography variant="body2" color="text.secondary">
          Pallets: {fNumber(pallets) || 'Not available'}
        </Typography>
      </Stack>
    </Card>
  );
};

PurchaseMetadata.propTypes = Props;

export default PurchaseMetadata;
