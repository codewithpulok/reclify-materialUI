import { ListItem, ListItemIcon, ListItemText, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { predefinedServiceFeatures } from 'src/assets/data/predefined-fields/service';
import { getIconify } from 'src/components/common/iconify/utilities';
import { getPredefinedFieldsValue } from 'src/utils/predefined-fields';
import { ServiceDetailsBox } from '../../box';

const Props = {
  type: PropTypes.string.isRequired,
  /** @type {{[key: string]: boolean}} */
  features: PropTypes.object.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ServiceFeatures = (props) => {
  const { features = {}, sx = {}, type } = props;

  const values = useMemo(
    () => getPredefinedFieldsValue(features, predefinedServiceFeatures(type)),
    [features, type]
  );
  return (
    <ServiceDetailsBox sx={sx} title="Services">
      <Stack>
        {values.map((field) => {
          if (!field?.value) return null;
          return (
            <ListItem key={field.key} disableGutters>
              {field?.icon && (
                <ListItemIcon>
                  {getIconify(field.icon, 16, { color: 'text.secondary' })}
                </ListItemIcon>
              )}
              <ListItemText primary={field.label} />
            </ListItem>
          );
        })}
      </Stack>
    </ServiceDetailsBox>
  );
};

ServiceFeatures.propTypes = Props;

export default ServiceFeatures;
