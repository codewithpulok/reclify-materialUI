import { ListItem, ListItemIcon, ListItemText, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { getIconify } from 'src/components/common/iconify/utilities';
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
      <Stack spacing={1}>
        {keyFeatures.map((feature, index) => (
          <ListItem key={`${feature}-${index}`} disableGutters sx={{ py: 0 }}>
            <ListItemIcon sx={{ mr: 0.7 }}>{getIconify('fluent-mdl2:radio-bullet')}</ListItemIcon>
            <ListItemText primary={feature} primaryTypographyProps={{ fontSize: '15px' }} />
          </ListItem>
        ))}
      </Stack>
    </WarehouseDetailsBox>
  );
};

ServiceKeyFeatures.propTypes = Props;

export default ServiceKeyFeatures;
