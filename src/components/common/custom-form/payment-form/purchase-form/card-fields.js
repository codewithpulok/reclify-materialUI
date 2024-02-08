import { useFormContext } from 'react-hook-form';
import {
  BillingAddressListDialog,
  PaymentCardListDialog,
} from 'src/components/common/custom-dialog';
import { useBoolean } from 'src/hooks/use-boolean';
import BillingDetails from '../common/billing-details';
import PaymentCard from '../common/payment-card';

const Props = {};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const CardFields = (props) => {
  const methods = useFormContext();
  const { watch, setValue } = methods;

  const billingDetails = watch('billing_details', undefined);
  const card = watch('card', undefined);

  const cardsDialog = useBoolean();
  const billingDetailsDialog = useBoolean();

  const onAddressChange = (newAddress) => {
    setValue('billing_details', newAddress);
  };
  const onCardChange = (newCard) => {
    setValue('card', newCard);
  };

  return (
    <>
      <BillingDetails billingDetails={billingDetails} onClick={billingDetailsDialog.onTrue} />
      <PaymentCard card={card} onClick={cardsDialog.onTrue} />

      <BillingAddressListDialog
        onClose={billingDetailsDialog.onFalse}
        open={billingDetailsDialog.value}
        selected={(id) => billingDetails?.id === id}
        onSelect={onAddressChange}
      />

      <PaymentCardListDialog
        onClose={cardsDialog.onFalse}
        open={cardsDialog.value}
        selected={(id) => card?.id === id}
        onSelect={onCardChange}
      />
    </>
  );
};

CardFields.propTypes = Props;

export default CardFields;
