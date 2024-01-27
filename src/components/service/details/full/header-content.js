import { Box, IconButton, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

import { getIconify } from 'src/components/common/iconify/utilities';
import { getServiceType } from 'src/constant/service-types';
import { ICONS } from '../../icons';

const Props = {
  /** @type {Service} */
  service: PropTypes.object.isRequired,
};

/**
 * @param {Props} props `
 * @returns {JSX.Element}
 */
const HeaderContent = (props) => {
  const { service } = props;
  const { type } = service;
  const router = useRouter();
  const serviceType = getServiceType(type);

  const goToBack = () => router.back();

  return (
    <Box sx={{ mb: 3 }}>
      <IconButton title="go back" onClick={goToBack} sx={{ p: 0, mb: 0.5 }}>
        {ICONS.back(32)}
      </IconButton>

      <Stack direction="row" alignItems="center" spacing={1}>
        {serviceType?.icon && getIconify(serviceType.icon, 48, { color: 'primary.main' })}
        <Typography variant="h2">{serviceType?.label}</Typography>
      </Stack>
    </Box>
  );
};

HeaderContent.propTypes = Props;

export default HeaderContent;
