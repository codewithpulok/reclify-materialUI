import { useFormContext } from 'react-hook-form';
import { CardTokenDialog } from 'src/components/common/custom-dialog';
import PaymentCard from 'src/components/common/custom-form/payment-form/common/payment-card';
import { useBoolean } from 'src/hooks/use-boolean';

const Props = {};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const CardField = (props) => {
  const methods = useFormContext();
  const { watch, setValue } = methods;

  const card = watch('card', undefined);

  const cardsDialog = useBoolean();

  const onCardChange = (data) => {
    setValue('card', data);
    cardsDialog.onFalse();
  };

  return (
    <>
      <PaymentCard
        card={card}
        onClick={cardsDialog.onTrue}
        sx={{ bgcolor: 'background.default' }}
      />

      <CardTokenDialog
        onClose={cardsDialog.onFalse}
        open={cardsDialog.value}
        onSubmit={onCardChange}
      />
    </>
  );
};

CardField.propTypes = Props;

export default CardField;
