import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { PlanFreeIcon, PlanPremiumIcon, PlanStarterIcon } from 'src/assets/icons';
import Iconify from 'src/components/common/iconify';
import Label from 'src/components/common/label';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { primary } from 'src/theme/palette';
import { fNumber } from 'src/utils/format-number';
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
  /** @type {'sm' | 'md'} */
  size: PropTypes.string,
  showEnterprise: PropTypes.bool,
};

// ----------------------------------------------------------------------

/**
 * Plan Card UI
 * @param {Props} props
 * @returns
 */
const PlanCard = (props) => {
  const {
    plan,
    isSelected,
    onSelect,
    sx = {},
    isCurrent,
    showAnnual,
    size = 'md',
    showEnterprise,
  } = props;

  const currentPrice = showAnnual ? plan?.annualPrice : plan?.price;

  const isSm = size === 'sm';

  const free = plan.id === 'free';
  const enterprise = plan.id === 'enterprise';
  const pro = plan.id === 'pro';

  const renderCurrent = isCurrent && (
    <Label color="info" startIcon={ICONS.current()} sx={{ position: 'absolute', top: 8, right: 8 }}>
      Current
    </Label>
  );

  const renderIcon = (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Box sx={{ width: 48, height: 48 }}>
        {free && icons.free}
        {pro && icons.pro}
        {enterprise && icons.enterprise}
      </Box>
    </Stack>
  );

  const renderSubscription = (
    <Stack spacing={1}>
      <Typography variant={isSm ? 'h6' : 'h4'} sx={{ textTransform: 'capitalize' }}>
        {plan.title}
      </Typography>
    </Stack>
  );

  const renderFree = <Typography variant={isSm ? 'h4' : 'h2'}>Free</Typography>;
  const renderPremium = (
    <Stack>
      <Stack direction="row">
        <Typography variant="h4" mr={0.2}>
          $
        </Typography>

        <Typography variant={isSm ? 'h4' : 'h2'}>{fNumber(currentPrice)}</Typography>

        <Typography
          component="span"
          sx={{
            alignSelf: 'center',
            color: 'text.disabled',
            ml: 1,
            typography: 'body2',
          }}
        >
          / mo
        </Typography>
      </Stack>
      {showAnnual && (
        <Stack direction="row" color="text.secondary">
          <Typography variant="h5" mr={0.2}>
            $
          </Typography>

          <Typography variant={isSm ? 'h5' : 'h3'}>{fNumber(currentPrice * 12)}</Typography>

          <Typography
            component="span"
            sx={{
              alignSelf: 'center',
              color: 'text.disabled',
              ml: 1,
              typography: 'body2',
            }}
          >
            / yr
          </Typography>
        </Stack>
      )}
    </Stack>
  );
  const renderEnterprise = showEnterprise ? (
    renderPremium
  ) : (
    <Stack alignItems="start" spacing={1}>
      <Button
        LinkComponent={RouterLink}
        href={`${paths.contact_us}/#FORM`}
        color="primary"
        variant="contained"
        size={isSm ? 'small' : 'medium'}
        fullWidth
      >
        Contact Us
      </Button>
      <Typography color="text.secondary" variant="body2">
        A la Carte
      </Typography>
    </Stack>
  );

  const renderPrice = (
    <>
      {free && renderFree}
      {pro && renderPremium}
      {enterprise && renderEnterprise}
    </>
  );

  const renderList = (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box component="span" sx={{ typography: 'overline' }}>
          Features
        </Box>
      </Stack>

      <Stack spacing={isSm ? 0.5 : 2}>
        {plan.features.map((item) => (
          <Stack key={item} spacing={1} direction="row" alignItems="center">
            <Iconify icon="eva:checkmark-fill" width={isSm ? 12 : 16} sx={{ mr: isSm ? 0 : 1 }} />
            <Typography flex={1} width={1} fontSize={isSm ? 13 : 16}>
              {item}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );

  return (
    <Stack
      spacing={isSm ? 2 : 5}
      component={Paper}
      variant="outlined"
      onClick={plan?.id === 'enterprise' || !onSelect ? undefined : () => onSelect(plan.id)}
      sx={{
        position: 'relative',
        p: isSm ? 2 : 5,
        borderRadius: isSm ? 1 : 2,
        cursor: onSelect && plan?.id !== 'enterprise' ? 'pointer' : 'default',
        boxShadow: `0 0 0 2px ${isSelected ? primary.main : 'transparent'}`,
        ...sx,
      }}
    >
      {renderCurrent}

      {renderIcon}

      {renderSubscription}

      {renderPrice}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderList}
    </Stack>
  );
};

PlanCard.propTypes = Props;

export default PlanCard;
