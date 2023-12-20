import 'mapbox-gl/dist/mapbox-gl.css';
import PropTypes from 'prop-types';
import { memo, useMemo } from 'react';
import Map from 'react-map-gl';

import { MapControl, MapMarker } from 'src/components/common/map';

// ----------------------------------------------------------------------

const MapMarkedProps = {
  markedData: PropTypes.array,
};

const initialViewState = { zoom: 2 };

/**
 * @param {MapMarkedProps & import('react-map-gl').MapProps} props
 * @returns {JSX.Element}
 */
const MapMarked = (props) => {
  const { markedData, ...other } = props;
  const initialPosition = useMemo(
    () => ({ longitude: markedData?.[0]?.latlng?.[1], latitude: markedData?.[0]?.latlng?.[0] }),
    [markedData]
  );

  return (
    <Map initialViewState={{ ...initialViewState, ...initialPosition }} {...other}>
      <MapControl />
      {markedData.map((city, index) => (
        <MapMarker key={`marker-${index}`} latitude={city.latlng[0]} longitude={city.latlng[1]} />
      ))}
    </Map>
  );
};

MapMarked.propTypes = MapMarkedProps;

export default memo(MapMarked);
