import { Stack, Tab, Tabs } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import AchField from './ach-field';
import CardFields from './card-fields';

const Props = {};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const PaymentTypeTab = (props) => {
  const methods = useFormContext();
  const { watch, setValue } = methods;

  const paymentType = watch('paymentType');

  const onTabChange = (v) => setValue('paymentType', v);

  return (
    <>
      <Tabs value={paymentType} onChange={(_e, v) => onTabChange(v)} variant="fullWidth" centered>
        <Tab label="Pay By ACH" value="ACH" />
        <Tab label="Pay By Card" value="CARD" />
      </Tabs>

      <Stack spacing={1} display={paymentType === 'ACH' ? undefined : 'none'}>
        <AchField />
      </Stack>

      <Stack spacing={1} display={paymentType === 'CARD' ? undefined : 'none'}>
        <CardFields />
      </Stack>
    </>
  );
};

PaymentTypeTab.propTypes = Props;

export default PaymentTypeTab;
