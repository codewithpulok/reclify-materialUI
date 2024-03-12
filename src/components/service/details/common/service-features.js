import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { predefinedServiceFeatures } from 'src/assets/data/predefined-fields/service';
import { getIconify } from 'src/components/common/iconify/utilities';
import Label from 'src/components/common/label';
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
      <Stack direction="row" flexWrap="wrap" spacing={1}>
        {values.map((field) => {
          if (!field?.value) return null;
          return (
            <Label key={field.key} startIcon={getIconify(field.icon)}>
              {field?.label}
            </Label>
          );
        })}
      </Stack>
    </ServiceDetailsBox>
  );
};

ServiceFeatures.propTypes = Props;

export default ServiceFeatures;
