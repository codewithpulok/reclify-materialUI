import { useFormContext } from 'react-hook-form';
import { ACHTokenDialog } from 'src/components/common/custom-dialog';
import AchCard from 'src/components/common/custom-form/payment-form/common/ach-card';
import { useBoolean } from 'src/hooks/use-boolean';

const Props = {};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const AchField = (props) => {
  const methods = useFormContext();
  const { watch, setValue } = methods;

  const ach = watch('ach', undefined);

  const achDialog = useBoolean();

  const onAchChange = (data) => {
    setValue('ach', data);
    achDialog.onFalse();
  };

  return (
    <>
      <AchCard ach={ach} onClick={achDialog.onTrue} sx={{ bgcolor: 'background.default' }} />

      <ACHTokenDialog onClose={achDialog.onFalse} open={achDialog.value} onSubmit={onAchChange} />
    </>
  );
};

AchField.propTypes = Props;

export default AchField;
