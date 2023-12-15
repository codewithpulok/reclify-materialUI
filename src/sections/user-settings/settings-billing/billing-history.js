import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

import { useBoolean } from 'src/hooks/use-boolean';

import { InvoiceListCard } from 'src/components/user-settings/cards';
import { ICONS } from '../config-settings';

// ----------------------------------------------------------------------
const BillingHistoryProps = {
  /** @type {Invoice[]} */
  invoices: PropTypes.array,
};

/**
 * Billing History UI
 * @param {BillingHistoryProps} props
 * @returns
 */
const BillingHistory = (props) => {
  const { invoices } = props;
  const showMore = useBoolean();

  return (
    <Card>
      <CardHeader title="Invoice History" />

      <Stack spacing={1.5} sx={{ px: 3, pt: 3 }}>
        {(showMore.value ? invoices : invoices.slice(0, 8)).map((invoice) => (
          <InvoiceListCard key={invoice.id} invoice={invoice} />
        ))}

        <Divider sx={{ borderStyle: 'dashed' }} />
      </Stack>

      <Stack alignItems="flex-start" sx={{ p: 2 }}>
        <Button
          size="small"
          color="inherit"
          startIcon={showMore.value ? ICONS.showLess() : ICONS.showMore()}
          onClick={showMore.onToggle}
        >
          {showMore.value ? `Show Less` : `Show More`}
        </Button>
      </Stack>
    </Card>
  );
};

BillingHistory.propTypes = BillingHistoryProps;

export default BillingHistory;
