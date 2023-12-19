import { Box, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { MapMarkersPopups, StyledMapContainer, baseSettings } from 'src/components/warehouse/map';
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
  return (
    <Box sx={{ ...sx, bgcolor: 'background.paper', px: 3, py: 2, borderRadius: 1, boxShadow: 1 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h5" sx={detailsHeaderStyle}>
          Map
        </Typography>
      </Stack>

      <StyledMapContainer>
        <MapMarkersPopups
          data={[
            {
              timezones: ['America/Aruba'],
              latlng: [12.5, -69.96666666],
              name: 'Aruba',
              country_code: 'AW',
              capital: 'Oranjestad',
              // photoUrl: _mock.image.cover(1),
            },
            {
              timezones: ['Asia/Kabul'],
              latlng: [33, 65],
              name: 'Afghanistan',
              country_code: 'AF',
              capital: 'Kabul',
              // photoUrl: _mock.image.cover(2),
            },
          ]}
          {...baseSettings}
          map
        />
      </StyledMapContainer>
    </Box>
  );
};

WarehouseAddressMap.propTypes = WarehouseAddressMapProps;

export default WarehouseAddressMap;
