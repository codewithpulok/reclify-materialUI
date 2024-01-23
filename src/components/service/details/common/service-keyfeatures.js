import { ListItem, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';
import { WarehouseDetailsBox } from 'src/components/warehouse/box';

const Props = {
  /** @type {String[]} */
  keyFeatures: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ServiceKeyFeatures = (props) => {
  const { keyFeatures = [], sx = {} } = props;
  return (
    <WarehouseDetailsBox title="Key Features" sx={sx}>
      {keyFeatures.map((feature, index) => (
        <ListItem key={`${feature}-${index}`} disableGutters>
          <ListItemText primary={feature} />
        </ListItem>
      ))}
    </WarehouseDetailsBox>
  );
};

ServiceKeyFeatures.propTypes = Props;

export default ServiceKeyFeatures;
