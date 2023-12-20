import { Box, Paper, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { PlanFreeIcon, PlanPremiumIcon, PlanStarterIcon } from 'src/assets/icons';
import Label from 'src/components/common/label';
import { ICONS } from '../config-user-settings';

// ----------------------------------------------------------------------

const PlanCardProps = {
  /** @type {Plan} */
  plan: PropTypes.object.isRequired,
  /** @type {boolean} */
  isSelected: PropTypes.bool.isRequired,
  /** @type {(id: string) => {}} */
  onSelect: PropTypes.func.isRequired,
};

/**
 * Plan Card UI
 * @param {PlanCardProps} props
 * @returns
 */
const PlanCard = (props) => {
  const { plan, isSelected, onSelect } = props;
  return (
    <Stack
      component={Paper}
      variant="outlined"
      onClick={() => onSelect(plan.subscription)}
      sx={{
        p: 2.5,
        position: 'relative',
        cursor: 'pointer',
        ...(plan.primary && {
          opacity: 0.48,
          cursor: 'default',
        }),
        ...(isSelected && {
          boxShadow: (theme) => `0 0 0 2px ${theme.palette.text.primary}`,
        }),
      }}
    >
      {plan.primary && (
        <Label
          color="info"
          startIcon={ICONS.current()}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          Current
        </Label>
      )}

      <Box sx={{ width: 48, height: 48 }}>
        {plan.subscription === 'basic' && <PlanFreeIcon />}
        {plan.subscription === 'starter' && <PlanStarterIcon />}
        {plan.subscription === 'premium' && <PlanPremiumIcon />}
      </Box>

      <Box
        sx={{
          typography: 'subtitle2',
          mt: 2,
          mb: 0.5,
          textTransform: 'capitalize',
        }}
      >
        {plan.subscription}
      </Box>

      <Stack direction="row" alignItems="center" sx={{ typography: 'h4' }}>
        {plan.price || 'Free'}

        {!!plan.price && (
          <Box component="span" sx={{ typography: 'body2', color: 'text.disabled', ml: 0.5 }}>
            /mo
          </Box>
        )}
      </Stack>
    </Stack>
  );
};

PlanCard.propTypes = PlanCardProps;

export default PlanCard;
