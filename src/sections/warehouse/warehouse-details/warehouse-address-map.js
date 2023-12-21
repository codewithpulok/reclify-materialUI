import { Box, Stack, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { THEMES, baseSettings } from 'src/components/common/map';
import { MapMarked } from 'src/components/common/map/presets';
import { detailsBoxStyle, detailsHeaderStyle } from '../styles';

const WarehouseAddressMapProps = {
  /** @type {SxProps} */
  sx: PropTypes.object,
  /** @type {Warehouse} */
  warehouse: PropTypes.object.isRequired,
};

/**
 * @param {WarehouseAddressMapProps} props
 * @returns {JSX.Element}
 */
const WarehouseAddressMap = (props) => {
  const { sx, warehouse } = props;
  const theme = useTheme();

  return (
    <Box sx={{ ...sx, ...detailsBoxStyle }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h5" sx={detailsHeaderStyle}>
          Map
        </Typography>
      </Stack>

      <Box
        sx={{
          zIndex: 0,
          width: '100%',
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
          marked={{
            latitude: 12.5,
            longitude: -69.96666666,
            warehouse,
          }}
          {...baseSettings}
          mapStyle={theme.palette.mode === 'dark' ? THEMES.dark : THEMES.light}
        />
      </Box>
    </Box>
  );
};

WarehouseAddressMap.propTypes = WarehouseAddressMapProps;

export default WarehouseAddressMap;
