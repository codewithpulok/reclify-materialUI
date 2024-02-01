import { Box, ListItemButton, Stack, Typography, listItemButtonClasses } from '@mui/material';
import PropTypes from 'prop-types';
import Label from 'src/components/common/label';

const AddressCard = (props) => {
  const { address, isSelected, onSelect } = props;
  return (
    <Stack
      spacing={0.5}
      component={ListItemButton}
      selected={isSelected}
      onClick={() => onSelect(address)}
      sx={{
        py: 1,
        px: 1.5,
        borderRadius: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        [`&.${listItemButtonClasses.selected}`]: {
          bgcolor: 'action.selected',
          '&:hover': {
            bgcolor: 'action.selected',
          },
        },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="subtitle2">{address.name}</Typography>

        {address.primary && <Label color="info">Primary</Label>}
      </Stack>

      {address.company && (
        <Box sx={{ color: 'primary.main', typography: 'caption' }}>{address.company}</Box>
      )}

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {address.fullAddress}
      </Typography>

      {address.phoneNumber && (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {address.phoneNumber}
        </Typography>
      )}
    </Stack>
  );
};

AddressCard.propTypes = {
  address: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

export default AddressCard;
