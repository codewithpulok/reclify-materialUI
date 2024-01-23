import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { memo, useMemo } from 'react';
import Map from 'react-map-gl';

import { MapControl, MapMarker, MapPopup } from 'src/components/common/map';
import { useBoolean } from 'src/hooks/use-boolean';
import { joinAddressObj } from 'src/utils/address';

// ----------------------------------------------------------------------

const MapMarkedProps = {
  /** @type {Marked} */
  marked: PropTypes.object.isRequired,
};

const initialViewState = { zoom: 16 };

/**
 * @param {MapMarkedProps & import('react-map-gl').MapProps} props
 * @returns {JSX.Element}
 */
const MapMarked = (props) => {
  const popup = useBoolean(false);
  const { marked, ...other } = props;
  const initialPosition = useMemo(
    () => ({ longitude: marked?.longitude, latitude: marked?.latitude }),
    [marked]
  );

  return (
    <Map initialViewState={{ ...initialViewState, ...initialPosition }} {...other}>
      <MapControl />

      {marked ? (
        <MapMarker
          latitude={marked.latitude}
          longitude={marked.longitude}
          onClick={(event) => {
            event.originalEvent.stopPropagation();
            popup.onTrue();
          }}
        />
      ) : null}

      {popup.value && marked && (
        <MapPopup latitude={marked.latitude} longitude={marked.longitude} onClose={popup.onFalse}>
          <Box sx={{ color: 'common.white' }}>
            <Typography variant="subtitle2" mb={1}>
              {marked.warehouse?.name}
            </Typography>

            <Typography component="div" variant="caption">
              <b>Address:</b> {joinAddressObj(marked?.warehouse?.address)}
            </Typography>
          </Box>
        </MapPopup>
      )}
    </Map>
  );
};

MapMarked.propTypes = MapMarkedProps;

export default memo(MapMarked);
