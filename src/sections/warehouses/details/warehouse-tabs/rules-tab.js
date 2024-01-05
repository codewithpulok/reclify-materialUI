import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';
import { ICONS } from '../../config-warehouse';
import { detailsBoxStyle } from '../../styles';

const RulesTabProps = {
  /** @type {String[]} */
  rules: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * @param {RulesTabProps} props
 * @returns {JSX.Element}
 */
const RulesTab = (props) => {
  const { rules, sx = {} } = props;
  return (
    <List sx={{ ...detailsBoxStyle, ...sx }} dense>
      {rules.map((rule, index) => (
        <ListItem key={`${rule}-${index}`} disableGutters>
          <ListItemIcon sx={{ mr: { xs: 1, sm: 1.2 } }}>{ICONS.rule(18)}</ListItemIcon>
          <ListItemText primary={rule} />
        </ListItem>
      ))}
    </List>
  );
};

RulesTab.propTypes = RulesTabProps;

export default RulesTab;
