import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { PlanFreeIcon, PlanPremiumIcon, PlanStarterIcon } from 'src/assets/icons';
import Label from 'src/components/common/label';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { fCurrency } from 'src/utils/format-number';
import { ICONS } from '../config-user-settings';

const icons = {
  free: <PlanFreeIcon />,
  pro: <PlanStarterIcon />,
  enterprise: <PlanPremiumIcon />,
};

const Props = {
  /** @type {Plan} */
  plan: PropTypes.object.isRequired,
  /** @type {boolean} */
  isSelected: PropTypes.bool,
  /** @type {(id: string) => {}} */
  onSelect: PropTypes.func,
  /** @type {SxProps} */
  sx: PropTypes.object,
  isCurrent: PropTypes.bool,
  showAnnual: PropTypes.bool,
};

// ----------------------------------------------------------------------

/**
 * Plan Card UI
 * @param {Props} props
 * @returns
 */
const PlanCard = (props) => {
  const { user } = useAppSelector(selectAuth);

  const { plan, isSelected, onSelect, sx = {}, isCurrent, showAnnual } = props;

  const currentPrice = showAnnual ? plan?.annualPrice : plan?.price;

  return (
    <Stack
      component={Paper}
      variant="outlined"
      onClick={plan?.id === 'enterprise' ? undefined : () => onSelect(plan.id)}
      sx={{
        p: 2.5,
        position: 'relative',
        cursor: onSelect && plan?.id !== 'enterprise' ? 'pointer' : 'default',
        ...(isSelected && {
          boxShadow: (theme) => `0 0 0 2px ${theme.palette.primary.main}`,
        }),
        ...sx,
      }}
    >
      {isCurrent && (
        <Label
          color="info"
          startIcon={ICONS.current()}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          Current
        </Label>
      )}

      {icons?.[plan.id] && <Box sx={{ width: 48, height: 48 }}>{icons?.[plan.id]}</Box>}

      <Box
        sx={{
          typography: 'subtitle2',
          mt: 2,
          mb: 0.5,
          textTransform: 'capitalize',
        }}
      >
        {plan.title}
      </Box>

      {plan?.id === 'enterprise' && user?.planId !== 'enterprise' ? (
        <Button
          LinkComponent={RouterLink}
          href={`${paths.contact_us}/#FORM`}
          color="primary"
          variant="contained"
          size="small"
        >
          Contact Us. A la Carte
        </Button>
      ) : (
        <>
          <Stack direction="row" alignItems="center" sx={{ typography: 'h4' }}>
            {currentPrice ? fCurrency(currentPrice) : 'Free'}

            {!!currentPrice && (
              <Box component="span" sx={{ typography: 'body2', color: 'text.disabled', ml: 0.5 }}>
                /mo
              </Box>
            )}
          </Stack>

          {showAnnual && !!currentPrice && (
            <Stack
              direction="row"
              alignItems="center"
              sx={{ typography: 'subtitle1', color: 'text.secondary' }}
            >
              {fCurrency(currentPrice * 12)}

              <Box component="span" sx={{ typography: 'body2', ml: 0.5 }}>
                /yr
              </Box>
            </Stack>
          )}
        </>
      )}

      {plan?.features && plan.features.length && (
        <>
          <Stack mt={3} mb={1}>
            <Typography variant="overline" color="text.secondary">
              Features
            </Typography>
          </Stack>

          <Stack spacing={0.5}>
            {plan.features.map((feature) => (
              <Stack key={feature} direction="row" alignItems="center" gap={0.5}>
                {ICONS.feature(14, { color: 'success.main' })}
                <Typography variant="caption">{feature}</Typography>
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
