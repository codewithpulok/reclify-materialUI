import PropTypes from 'prop-types';
import { useState } from 'react';
import Map from 'react-map-gl';
// mui
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
// constants
import { ADDRESS } from 'src/constant/address';
// components
import { MAPBOX_API } from 'src/config-global';
import Iconify from 'src/components/common/iconify';
import { MapControl, MapMarker, MapPopup } from 'src/components/common/map';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  zIndex: 0,
  height: 560,
  overflow: 'hidden',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  '& .mapboxgl-ctrl-logo, .mapboxgl-ctrl-bottom-right': {
    display: 'none',
  },
}));

// ----------------------------------------------------------------------

export default function ContactMap() {
  const theme = useTheme();
  const lightMode = theme.palette.mode === 'light';
  const [popupInfo, setPopupInfo] = useState(null);
  console.log({ popupInfo });

  return (
    <StyledRoot>
      <Map
        initialViewState={{
          latitude: 40.013217,
          longitude: -75.0887584,
          zoom: 8,
        }}
        mapStyle={`mapbox://styles/mapbox/${lightMode ? 'light' : 'dark'}-v10`}
        mapboxAccessToken={MAPBOX_API}
      >
        <MapControl hideGeolocateControl />
        <MapMarker
          latitude={ADDRESS.lat}
          longitude={ADDRESS.long}
          onClick={(event) => {
            event.originalEvent.stopPropagation();
            setPopupInfo(ADDRESS);
          }}
        />

        {popupInfo && (
          <MapPopup
            longitude={popupInfo.lat}
            latitude={popupInfo.long}
            onClose={() => setPopupInfo(null)}
            sx={{
              '& .mapboxgl-popup-content': { bgcolor: 'common.white' },
              '&.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip': {
                borderTopColor: '#FFF',
              },
              '&.mapboxgl-popup-anchor-top .mapboxgl-popup-tip': {
                borderBottomColor: '#FFF',
              },
            }}
          >
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
              Address
            </Typography>

            <Typography component="div" variant="caption">
              {popupInfo.address}
            </Typography>

            <Typography
              component="div"
              variant="caption"
              sx={{ mt: 1, display: 'flex', alignItems: 'center' }}
            >
              <Iconify icon="solar:phone-bold" width={14} sx={{ mr: 0.5 }} />
              {popupInfo.phoneNumber}
            </Typography>
          </MapPopup>
        )}
      </Map>
    </StyledRoot>
  );
}

ContactMap.propTypes = {
  contacts: PropTypes.array,
};
