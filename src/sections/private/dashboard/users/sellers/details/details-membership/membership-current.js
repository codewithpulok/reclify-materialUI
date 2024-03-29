import { Card, CardContent, CardHeader, Stack, Switch, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { PlanCard } from 'src/components/user-settings/cards';
import { useBoolean } from 'src/hooks/use-boolean';

// ----------------------------------------------------------------------

const Props = {
  /** @type {Plan} */
  currentPlan: PropTypes.object,
};

// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const MembershipCurrent = (props) => {
  const { currentPlan } = props;
  const isAnnual = useBoolean();

  return (
    <Card>
      <CardHeader
        title="Current Plan"
        action={
          <Stack direction="row" alignItems="center" justifyContent="center">
            <Typography variant="overline">MONTHLY</Typography>
            <Switch
              value={isAnnual.value}
              onChange={(_e, v) => isAnnual.setValue(v)}
              color="primary"
              size="small"
            />
            <Typography variant="overline">YEARLY</Typography>
          </Stack>
        }
      />
      <CardContent>
        <PlanCard plan={currentPlan} showEnterprise showAnnual={isAnnual.value} />
      </CardContent>
    </Card>
  );
};

MembershipCurrent.propTypes = Props;

export default MembershipCurrent;
