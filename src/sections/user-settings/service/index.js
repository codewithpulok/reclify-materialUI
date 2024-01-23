'use client';

import { Button, Stack } from '@mui/material';
// local components

import { getServiceById } from 'src/assets/dummy/services';
import { ServiceDetailsPreview } from 'src/components/service/details';
import { useBoolean } from 'src/hooks/use-boolean';
import ServiceForm from './service-form';

const Props = {};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const SettingsService = (props) => {
  const service = getServiceById();
  const previewMode = useBoolean(false);

  return (
    <>
      <Stack direction="row" justifyContent="end" mb={5}>
        <Button
          sx={{ width: { xs: '100%', sm: 'auto' } }}
          color={!previewMode.value ? 'primary' : 'secondary'}
          variant="contained"
          onClick={previewMode.onToggle}
          fullWidth
        >
          {!previewMode.value ? 'Preview' : 'Edit Mode'}
        </Button>
      </Stack>

      {previewMode.value && <ServiceDetailsPreview service={service} />}
      {!previewMode.value && <ServiceForm service={service} />}
    </>
  );
};

SettingsService.propTypes = Props;

export default SettingsService;
