import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { useBillingInfoPrimaryQuery } from 'src/redux-toolkit/services/billingInfoApi';
import { useCardPrimaryQuery } from 'src/redux-toolkit/services/cardApi';
import { LoadingState } from '../../../custom-state';
import { CustomFormProps } from '../../config-custom-form';
import PurchaseFormFields from './purchase-form-fields';

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

  // refetch api on user update
  useEffect(() => {
    if (user?.id) {
      infoResponse.refetch();
      cardResponse.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!infoResponse.isLoading && !cardResponse.isLoading) {
    return (
      <PurchaseFormFields
        priamryPaymentCard={cardResponse.data?.result}
        primaryBillingAddress={infoResponse.data?.result}
        wrapperElement={wrapperElement}
        {...other}
      />
    );
  }

  return (
    <Stack component={wrapperElement} sx={{ py: 1 }}>
      <LoadingState />
    </Stack>
  );
};

PurchaseForm.propTypes = Props;

export default PurchaseForm;
