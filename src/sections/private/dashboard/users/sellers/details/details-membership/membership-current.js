import { Card, CardContent, CardHeader } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { ErrorState, LoadingState } from 'src/components/common/custom-state';
import { PlanCard } from 'src/components/user-settings/cards';
import { usePlanGetQuery } from 'src/redux-toolkit/services/planApi';

// ----------------------------------------------------------------------

const Props = {
  /** @type {PlanId} */
  currentPlanId: PropTypes.string,
};

// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const MembershipCurrent = (props) => {
  const { currentPlanId } = props;

  // api state
  const planResponse = usePlanGetQuery(currentPlanId, { skip: !currentPlanId });

  // fetch plan details based on plan id
  useEffect(() => {
    if (currentPlanId) {
      planResponse.refetch(currentPlanId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlanId]);

  return (
    <Card>
      <CardHeader title="Current Plan" />
      <CardContent>
        {planResponse?.isLoading && <LoadingState />}
        {!planResponse?.isLoading && planResponse.isError && <ErrorState />}
        {!planResponse?.isLoading && planResponse.isSuccess && (
          <PlanCard plan={planResponse?.data?.results} />
        )}
      </CardContent>
    </Card>
  );
};

MembershipCurrent.propTypes = Props;

export default MembershipCurrent;
