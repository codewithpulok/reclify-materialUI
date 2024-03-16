import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';

import { CardContent, Pagination } from '@mui/material';
import { InvoiceListCard } from 'src/components/user-settings/cards';
import usePagination from 'src/hooks/use-pagination';

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
  const { invoices = [] } = props;

  const { currentData, currentPage, goTo, totalPages } = usePagination(invoices, 8);

  return (
    <Card>
      <CardHeader title="Invoice History" />

      <CardContent>
        <Stack spacing={1.5}>
          {currentData.map((invoice) => (
            <InvoiceListCard key={invoice.id} invoice={invoice} />
          ))}
        </Stack>

        <Stack direction="row" justifyContent="center" mt={3} mb={1}>
          <Pagination
            count={totalPages}
            color="primary"
            size="small"
            page={currentPage}
            onChange={(_e, page) => goTo(page)}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

BillingHistory.propTypes = BillingHistoryProps;

export default BillingHistory;
