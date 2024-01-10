import { m } from 'framer-motion';
import PropTypes from 'prop-types';

import Badge, { badgeClasses } from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import { varHover } from 'src/components/common/animate';
import Iconify from 'src/components/common/iconify';
import { useSettingsContext } from 'src/components/common/settings';

// ----------------------------------------------------------------------

export default function SettingsButton({ sx }) {
  const settings = useSettingsContext();

  return (
    <Badge
      color="error"
      variant="dot"
      invisible={!settings.canReset}
      sx={{
        [`& .${badgeClasses.badge}`]: {
          top: 8,
          right: 8,
        },
        ...sx,
      }}
    >
      <Box>
        <IconButton
          component={m.button}
          whileTap="tap"
          whileHover="hover"
          variants={varHover(1.05)}
          aria-label="settings"
          onClick={settings.onToggle}
          sx={{
            width: 40,
            height: 40,
          }}
        >
          <Iconify icon="solar:palette-bold-duotone" width={24} />
        </IconButton>
      </Box>
    </Badge>
  );
}

SettingsButton.propTypes = {
  sx: PropTypes.object,
};
