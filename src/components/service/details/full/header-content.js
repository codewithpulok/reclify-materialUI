import { Avatar, Box, IconButton, Stack, Typography, alpha } from '@mui/material';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

import { getIconify } from 'src/components/common/iconify/utilities';
import Label from 'src/components/common/label';
import { PLACEHOLDER_PROFILE_BANNER } from 'src/config-global';
import { getServiceType } from 'src/constant/service-types';
import { bgGradient } from 'src/theme/css';
import { joinAddressObj } from 'src/utils/address';
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
      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        alignItems={{
          xs: 'start',
          sm: 'center',
        }}
        spacing={1}
        mt="auto"
      >
        {service?.logo && <Avatar src={service?.logo} sx={{ height: '90px', width: '90px' }} />}
        <Stack alignItems="start">
          <Typography variant="h2">{service?.name}</Typography>
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
            <Label startIcon={getIconify(serviceType.icon)} color="primary">
              {serviceType?.label}
            </Label>
            <Typography variant="body2">{joinAddressObj(service?.address)}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

HeaderContent.propTypes = Props;

export default HeaderContent;
