import { ListItem, ListItemText, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { predefinedServiceFeatures } from 'src/assets/data/predefined-fields/service';
import { serviceTypes } from 'src/constant/service-types';
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
  const predefinedFields = useMemo(
    () => predefinedServiceFeatures(serviceTypes.find((s) => s.value === type)?.subtypes || []),
    [type]
  );
  const values = useMemo(
    () => getPredefinedFieldsValue(features, predefinedFields),
    [features, predefinedFields]
  );
  return (
    <ServiceDetailsBox sx={sx} title="Features">
      <Stack>
        {values.map((field) => {
          if (!field?.value) return null;
          return (
            <ListItem key={field.key} disableGutters>
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
