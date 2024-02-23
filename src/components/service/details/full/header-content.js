import { Box, IconButton, Stack, Typography, alpha } from '@mui/material';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

import { getIconify } from 'src/components/common/iconify/utilities';
import Image from 'src/components/common/image';
import { PLACEHOLDER_PROFILE_BANNER } from 'src/config-global';
import { getServiceType } from 'src/constant/service-types';
import { bgGradient } from 'src/theme/css';
import { ICONS } from '../../icons';

const Props = {
  /** @type {Service} */
  service: PropTypes.object.isRequired,
  hideBack: PropTypes.bool,
};

/**
 * @param {Props} props `
 * @returns {JSX.Element}
 */
const HeaderContent = (props) => {
  const { service, hideBack } = props;
  const { type } = service;
  const router = useRouter();
  const serviceType = getServiceType(type);

  const goToBack = () => router.back();

  return (
    <Stack
      alignItems="start"
      sx={(theme) => ({
        ...bgGradient({
          color: alpha(
            theme.palette.background.default,
            theme.palette.mode === 'light' ? 0.8 : 0.94
          ),
          imgUrl: service?.banner || PLACEHOLDER_PROFILE_BANNER,
        }),
        minHeight: 170,
        px: 2,
        py: 2,
        borderRadius: 1,
        mb: 0.5,
      })}
    >
      {!hideBack && (
        <IconButton title="go back" onClick={goToBack} sx={{ p: 0, mb: 0.5 }}>
          {ICONS.back(32)}
        </IconButton>
      )}

      <Box mt="auto" />

      {service?.logo && <Image src={service?.logo} sx={{ height: '90px', borderRadius: 1 }} />}

      <Stack direction="row" alignItems="center" spacing={1}>
        {serviceType?.icon && getIconify(serviceType.icon, 48, { color: 'primary.main' })}
        <Typography variant="h2">{serviceType?.label}</Typography>
      </Stack>
    </Stack>
  );
};

HeaderContent.propTypes = Props;

export default HeaderContent;
