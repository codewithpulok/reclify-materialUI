import { Card, CardContent, CardHeader } from '@mui/material';
import PropTypes from 'prop-types';
import { PlanCard } from 'src/components/user-settings/cards';

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

  return (
    <Card>
      <CardHeader title="Current Plan" />
      <CardContent>
        <PlanCard
          plan={currentPlan}
          annualPlan={currentPlan?.annualPlan}
          showAnnual={currentPlan?.annualPlan}
          isCurrent
          hideCurrent
          showEnterprise
        />
      </CardContent>
    </Card>
  );
};

MembershipCurrent.propTypes = Props;

export default MembershipCurrent;
