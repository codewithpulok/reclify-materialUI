import { useFormContext } from 'react-hook-form';
import { ACHInfoListDialog } from 'src/components/common/custom-dialog';
import { useBoolean } from 'src/hooks/use-boolean';
import AchCard from '../common/ach-card';

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

  const onAchChange = (newAddress) => {
    setValue('ach', newAddress);
  };

  return (
    <>
      <AchCard ach={ach} onClick={achDialog.onTrue} />

      <ACHInfoListDialog
        onClose={achDialog.onFalse}
        open={achDialog.value}
        selected={(id) => ach?.id === id}
        onSelect={onAchChange}
      />
    </>
  );
};

AchField.propTypes = Props;

export default AchField;
