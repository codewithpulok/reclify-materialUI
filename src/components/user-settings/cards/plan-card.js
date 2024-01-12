import { Box, Paper, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { PlanFreeIcon, PlanPremiumIcon, PlanStarterIcon } from 'src/assets/icons';
import Label from 'src/components/common/label';
import { fCurrency } from 'src/utils/format-number';
import { ICONS } from '../config-user-settings';

const Props = {
  /** @type {Plan} */
  plan: PropTypes.object.isRequired,
  /** @type {boolean} */
  isSelected: PropTypes.bool,
  /** @type {(id: string) => {}} */
  onSelect: PropTypes.func,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

// ----------------------------------------------------------------------

/**
 * Plan Card UI
 * @param {Props} props
 * @returns
 */
const PlanCard = (props) => {
  const { plan, isSelected, onSelect, sx = {} } = props;

  return (
    <Stack
      component={Paper}
      variant="outlined"
      onClick={() => {
        if (onSelect) onSelect(plan.subscription);
      }}
      sx={{
        p: 2.5,
        position: 'relative',
        cursor: onSelect ? 'pointer' : 'default',
        ...(isSelected && {
          boxShadow: (theme) => `0 0 0 2px ${theme.palette.primary.main}`,
        }),
        ...sx,
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
        {plan.price ? fCurrency(plan.price) : 'Free'}

        {!!plan.price && (
          <Box component="span" sx={{ typography: 'body2', color: 'text.disabled', ml: 0.5 }}>
            /mo
          </Box>
        )}
      </Stack>

      {plan?.features && plan.features.length && (
        <>
          <Stack mt={3} mb={1}>
            <Typography variant="overline" color="text.secondary">
              Features
            </Typography>
          </Stack>

          <Stack spacing={0.5}>
            {plan.features.map((feature) => (
              <Stack key={feature.id} direction="row" alignItems="center" gap={0.5}>
                {ICONS.feature(14, { color: 'success.main' })}
                <Typography variant="caption">{feature.title}</Typography>
              </Stack>
            ))}
          </Stack>
        </>
      )}
    </Stack>
  );
};

PlanCard.propTypes = Props;

export default PlanCard;
