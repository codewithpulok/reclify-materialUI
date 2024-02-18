import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { useAchPrimaryQuery } from 'src/redux-toolkit/services/achApi';
import { useBillingInfoPrimaryQuery } from 'src/redux-toolkit/services/billingInfoApi';
import { useCardPrimaryQuery } from 'src/redux-toolkit/services/cardApi';
import { LoadingState } from '../../../custom-state';
import { CustomFormProps } from '../../config-custom-form';
import PurchaseFormFields from './purchase-fields';

export const Props = {
  wrapperElement: PropTypes.elementType,
  ...CustomFormProps,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const PurchaseForm = (props) => {
  const { wrapperElement, ...other } = props;

  const { user } = useAppSelector(selectAuth);

  const infoResponse = useBillingInfoPrimaryQuery();
  const cardResponse = useCardPrimaryQuery();
  const achResponse = useAchPrimaryQuery();

  // refetch api on user update
  useEffect(() => {
    if (user?.id) {
      infoResponse.refetch();
      cardResponse.refetch();
      achResponse.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // success state
  if (!infoResponse.isLoading && !cardResponse.isLoading && !achResponse.isLoading) {
    return (
      <PurchaseFormFields
        primaryCard={cardResponse.data?.results}
        primaryAddress={infoResponse.data?.results}
        primaryAch={achResponse.data?.results}
        wrapperElement={wrapperElement}
        {...other}
      />
    );
  }

  // loading state
  return (
    <Stack component={wrapperElement} sx={{ p: 3 }}>
      <LoadingState />
    </Stack>
  );
};

PurchaseForm.propTypes = Props;

export default PurchaseForm;
