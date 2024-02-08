import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { ListItemButton } from '@mui/material';
import { ICONS } from '../../config-custom-form';

const Props = {
  /** @type {ACHType | undefined} */
  ach: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};
// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const AchCard = (props) => {
  const { ach, sx, onClick, ...other } = props;

  return (
    <Stack
      spacing={0.2}
      component={ListItemButton}
      variant="outlined"
      sx={{
        py: 1,
        px: 1.5,

        alignItems: 'start',
        borderRadius: 1,

        position: 'relative',
        cursor: 'pointer',

        boxShadow: (theme) => `0 0 0 1px ${theme.palette.text.disabled}`,

        ...sx,
      }}
      onClick={onClick}
      {...other}
    >
      <Stack width="100%" direction="row" alignItems="start" justifyContent="space-between">
        {!ach && <Typography variant="subtitle2">Select ACH</Typography>}

        {ICONS.dropdown()}
      </Stack>
      {ach && (
        <>
          <Typography variant="subtitle1">{ach?.routingNumber}</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {ach?.accountNumber}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {ach?.accountName}
          </Typography>
        </>
      )}
    </Stack>
  );
};

AchCard.propTypes = Props;

export default AchCard;
