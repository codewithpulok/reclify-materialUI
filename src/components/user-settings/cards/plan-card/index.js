import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import Iconify from 'src/components/common/iconify';
import Label from 'src/components/common/label';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { primary } from 'src/theme/palette';
import { fNumber } from 'src/utils/format-number';
import { ICONS } from '../../config-user-settings';
import VerifyBtn from './verify-btn';

const icons = {
  free: '/assets/icons/plans/free-tier.svg',
  pro: '/assets/icons/plans/pro-tier.svg',
  enterprise: '/assets/icons/plans/enterprise-tier.svg',
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
  /** @type {'sm' | 'md'} */
  size: PropTypes.string,
  href: PropTypes.string,
  showEnterprise: PropTypes.bool,
  isCurrent: PropTypes.bool,
  isPopular: PropTypes.bool,
  showAnnual: PropTypes.bool,
  isStatic: PropTypes.bool,
  annualPlan: PropTypes.bool,
  hideCurrent: PropTypes.bool,
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
    isPopular,
    showAnnual,
    size = 'md',
    showEnterprise,
    href,
    isStatic = true,
    annualPlan,
    hideCurrent,
  } = props;

  const currentPrice = showAnnual || (annualPlan && isCurrent) ? plan?.annualPrice : plan?.price;

  const savings = useMemo(() => {
    if (!showAnnual) return 0;

    const difference = (plan.price || 0) - (plan.annualPrice || 0);

    if (difference <= 0) return 0;

    const percent = (25 / plan.annualPrice) * 100;

    return percent;
  }, [plan?.annualPrice, plan?.price, showAnnual]);

  const isSm = size === 'sm';

  const free = plan.id === 'free';
  const enterprise = plan.id === 'enterprise';
  const pro = plan.id === 'pro';

  const renderLabel = (
    <Stack direction="row" alignItems="start" spacing={1} minHeight={50}>
      {isPopular && (
        <Label color="secondary" startIcon={ICONS.hot()}>
          Popular
        </Label>
      )}
      {isCurrent && !hideCurrent && (
        <Label color="info" startIcon={ICONS.current()}>
          Current
        </Label>
      )}
      {isCurrent && annualPlan === true && <Label color="success">Annually</Label>}
      {isCurrent && annualPlan === false && <Label color="success">Monthly</Label>}
    </Stack>
  );

  const renderIcon = (
    <>
      {free && (
        <Image
          src={icons.free}
          width={100}
          height={100}
          style={{ top: 0, right: 0, position: 'absolute' }}
          alt={plan.title}
        />
      )}
      {pro && (
        <Image
          src={icons.pro}
          width={100}
          height={100}
          style={{ top: 0, right: 0, position: 'absolute' }}
          alt={plan.title}
        />
      )}
      {enterprise && (
        <Image
          src={icons.enterprise}
          width={100}
          height={100}
          style={{ top: 0, right: 0, position: 'absolute' }}
          alt={plan.title}
        />
      )}
    </>
  );

  const renderSubscription = (
    <Stack spacing={1} sx={{ position: 'relative', mb: 2, minHeight: 60 }}>
      {renderLabel}

      <Typography
        variant={isSm ? 'h6' : 'h4'}
        color="primary.main"
        sx={{ textTransform: 'capitalize' }}
      >
        {plan.title}
      </Typography>

      {renderIcon}
    </Stack>
  );

  const renderFree = (
    <Stack minHeight={100}>
      <Typography variant={isSm ? 'h4' : 'h3'}>Free</Typography>
    </Stack>
  );
  const renderPremium = (
    <Stack minHeight={100}>
      {showAnnual ? (
        <Stack direction="row">
          <Typography variant="h4" mr={0.2}>
            $
          </Typography>

          <Typography variant={isSm ? 'h4' : 'h3'}>{fNumber(currentPrice * 12)}</Typography>

          <Typography
            component="span"
            sx={{
              alignSelf: 'center',
              color: 'text.disabled',
              ml: 0.3,
              typography: 'h5',
            }}
          >
            /yr
          </Typography>
        </Stack>
      ) : (
        <Stack direction="row">
          <Typography variant="h4" mr={0.2}>
            $
          </Typography>

          <Typography variant={isSm ? 'h4' : 'h3'}>{fNumber(currentPrice)}</Typography>

          <Typography
            component="span"
            sx={{
              alignSelf: 'center',
              color: 'text.disabled',
              ml: 0.3,
              typography: 'h5',
            }}
          >
            /mo
          </Typography>
        </Stack>
      )}

      <Typography
        color="text.secondary"
        variant="h6"
        visibility={showAnnual ? 'visible' : 'hidden'}
      >
        ${fNumber(currentPrice)} /mo
      </Typography>
    </Stack>
  );
  const renderEnterpriseContact = (
    <Stack alignItems="start" spacing={1} minHeight={100}>
      {!href && (
        <>
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
        </>
      )}
    </Stack>
  );
  const renderEnterprise = showEnterprise ? renderPremium : renderEnterpriseContact;

  const renderPrice = (
    <>
      {free && renderFree}
      {pro && renderPremium}
      {enterprise && renderEnterprise}
    </>
  );

  const renderList = (
    <Stack spacing={2} flex={1}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box component="span" sx={{ typography: 'overline' }}>
          Features
        </Box>
      </Stack>

      <Stack spacing={isSm ? 0.5 : 2}>
        {plan.features.map((item) => (
          <Stack key={item} spacing={1} direction="row" alignItems="center">
            <Iconify
              icon="eva:checkmark-fill"
              width={isSm ? 12 : 16}
              sx={{ mr: isSm ? 0 : 1, color: 'primary.main' }}
            />
            <Typography flex={1} width={1} fontSize={isSm ? 13 : 16}>
              {item}
            </Typography>
          </Stack>
        ))}
      </Stack>

      {Array.isArray(plan?.verifiedFeatures) && !!plan?.verifiedFeatures?.length && (
        <>
          <Stack direction="row" alignItems="center" justifyContent="start" spacing={0.5}>
            <Typography variant="overline">VERIFIED</Typography>
            {ICONS.verified(18, { color: 'primary.main' })}

            {!isStatic && <VerifyBtn />}
          </Stack>

          <Stack spacing={isSm ? 0.5 : 2}>
            {plan.verifiedFeatures.map((item) => (
              <Stack key={item} spacing={1} direction="row" alignItems="center">
                <Iconify
                  icon="eva:checkmark-fill"
                  width={isSm ? 12 : 16}
                  sx={{ mr: isSm ? 0 : 1, color: 'primary.main' }}
                />
                <Typography flex={1} width={1} fontSize={isSm ? 13 : 16}>
                  {item}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </>
      )}
    </Stack>
  );

  const renderAction = href && (
    <Stack mt={4} minHeight="70px">
      {href && (
        <>
          {free && (
            <Button
              LinkComponent={RouterLink}
              href={href}
              variant="outlined"
              size="large"
              fullWidth
            >
              Choose Package
            </Button>
          )}

          {pro && (
            <Button
              LinkComponent={RouterLink}
              href={href}
              color="primary"
              variant="contained"
              size="large"
              fullWidth
            >
              Choose Package
            </Button>
          )}

          {enterprise && (
            <>
              <Button
                LinkComponent={RouterLink}
                href={`${paths.contact_us}/#FORM`}
                color="primary"
                variant="contained"
                size="large"
                fullWidth
              >
                Contact Us
              </Button>
              <Typography color="text.secondary" variant="body2">
                A la Carte
              </Typography>
            </>
          )}
        </>
      )}
    </Stack>
  );

  return (
    <Stack
      component={Paper}
      variant="outlined"
      onClick={plan?.id === 'enterprise' || !onSelect ? undefined : () => onSelect(plan.id)}
      sx={{
        position: 'relative',
        p: isSm ? 2 : 4,
        borderRadius: isSm ? 1 : 2,
        cursor: onSelect && plan?.id !== 'enterprise' ? 'pointer' : 'default',
        boxShadow: `0 0 0 2px ${isSelected ? primary.main : 'transparent'}`,
        ...sx,
      }}
    >
      {renderSubscription}

      {renderPrice}

      {!!savings && (
        <Label variant="filled" color="secondary" sx={{ mb: 1 }}>
          You Save Up To {savings}%
        </Label>
      )}

      <Box mb={4}>
        <Typography variant="body2" color="text.secondary">
          {free && 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'}
          {pro && 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi sed'}
          {enterprise && 'Lorem, ipsum dolor sit amet consectetur adipisicing.'}
        </Typography>
      </Box>

      {renderList}

      {renderAction}
    </Stack>
  );
};

PlanCard.propTypes = Props;

export default PlanCard;
