import { ListItem, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';
import { WarehouseDetailsBox } from 'src/components/warehouse/box';

const Props = {
  /** @type {String[]} */
  rules: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const WarehouseRules = (props) => {
  const { rules, sx = {} } = props;
  return (
    <WarehouseDetailsBox title="Rules" sx={sx}>
      {rules.map((rule, index) => (
        <ListItem key={`${rule}-${index}`} disableGutters>
          <ListItemText primary={rule} />
        </ListItem>
      ))}
    </WarehouseDetailsBox>
  );
};

WarehouseRules.propTypes = Props;

export default WarehouseRules;
