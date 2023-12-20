import { Box, Stack, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { THEMES, baseSettings } from 'src/components/common/map';
import { MapMarked } from 'src/components/common/map/presets';
import { detailsHeaderStyle } from '../styles';

const WarehouseAddressMapProps = {
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * @param {WarehouseAddressMapProps} props
 * @returns {JSX.Element}
 */
const WarehouseAddressMap = (props) => {
  const { sx } = props;
  const theme = useTheme();

  return (
    <Box sx={{ ...sx, bgcolor: 'background.paper', px: 3, py: 2, borderRadius: 1, boxShadow: 1 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h5" sx={detailsHeaderStyle}>
          Map
        </Typography>
      </Stack>

      <Box
        sx={{
          zIndex: 0,
          height: 500,
          overflow: 'hidden',
          position: 'relative',
          borderRadius: 1,
          '& .mapboxgl-ctrl-logo, .mapboxgl-ctrl-bottom-right': {
            display: 'none',
          },
        }}
      >
        <MapMarked
          markedData={[
            {
              latlng: [12.5, -69.96666666],
              name: 'Aruba',
            },
          ]}
          {...baseSettings}
          mapStyle={theme.palette.mode === 'dark' ? THEMES.dark : THEMES.light}
        />
      </Box>
    </Box>
  );
};

WarehouseAddressMap.propTypes = WarehouseAddressMapProps;

export default WarehouseAddressMap;
