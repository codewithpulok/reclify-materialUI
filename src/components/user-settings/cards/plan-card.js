import { Box, Link, Paper, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { PlanFreeIcon, PlanPremiumIcon, PlanStarterIcon } from 'src/assets/icons';
import Label from 'src/components/common/label';
import { useBoolean } from 'src/hooks/use-boolean';
import { fCurrency } from 'src/utils/format-number';
import { ICONS } from '../config-user-settings';

const PlanCardProps = {
  /** @type {Plan} */
  plan: PropTypes.object.isRequired,
  /** @type {boolean} */
  isSelected: PropTypes.bool,
  /** @type {(id: string) => {}} */
  onSelect: PropTypes.func,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

const MAX_FEATURES_SHOW = 5;
// ----------------------------------------------------------------------

/**
 * Plan Card UI
 * @param {PlanCardProps} props
 * @returns
 */
const PlanCard = (props) => {
  const { plan, isSelected, onSelect, sx = {} } = props;

  const showMore = useBoolean();

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
        ...(plan.primary && {
          opacity: 0.48,
          cursor: 'default',
        }),
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
          <Stack direction="row" alignItems="center" justifyContent="space-between" mt={3} mb={1}>
            <Typography variant="overline" color="text.secondary">
              Features
            </Typography>

            {plan.features.length > MAX_FEATURES_SHOW && (
              <Link
                sx={{ typography: 'caption' }}
                onClick={(e) => {
                  showMore.onToggle();
                  e.stopPropagation();
                }}
              >
                {showMore.value ? 'less' : 'more'}
              </Link>
            )}
          </Stack>

          <Stack spacing={0.5}>
            {[...plan.features]
              .slice(0, showMore.value ? undefined : MAX_FEATURES_SHOW)
              .map((feature) => (
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

PlanCard.propTypes = PlanCardProps;

export default PlanCard;
