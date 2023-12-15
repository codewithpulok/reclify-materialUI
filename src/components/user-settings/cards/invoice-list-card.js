import { Link, ListItemText, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { fCurrency } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';

const InvoiceListCardProps = {
  /** @type {Invoice} */
  invoice: PropTypes.object.isRequired,
};

/**
 * Invoice List Card UI
 * @param {InvoiceListCardProps} props
 * @returns
 */
const InvoiceListCard = (props) => {
  const { invoice } = props;

  return (
    <Stack direction="row" alignItems="center">
      <ListItemText
        primary={invoice.invoiceNumber}
        secondary={fDate(invoice.createdAt)}
        primaryTypographyProps={{
          typography: 'body2',
        }}
        secondaryTypographyProps={{
          mt: 0.5,
          component: 'span',
          typography: 'caption',
          color: 'text.disabled',
        }}
      />

      <Typography variant="body2" sx={{ textAlign: 'right', mr: 5 }}>
        {fCurrency(invoice.price)}
      </Typography>

      <Link color="inherit" underline="always" variant="body2" href={invoice.pdfUrl}>
        PDF
      </Link>
    </Stack>
  );
};

InvoiceListCard.propTypes = InvoiceListCardProps;

export default InvoiceListCard;
