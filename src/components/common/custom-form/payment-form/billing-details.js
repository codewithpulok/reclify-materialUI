import { ListItemButton, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { getWarehouseAddress } from 'src/components/warehouse/utils';
import { ICONS } from '../config-custom-form';

const BillingDetailsProps = {
  /** @type {BillingAddress | undefined} */
  billingDetails: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * @param {BillingDetailsProps} props
 * @returns {JSX.Element}
 */
const BillingDetails = (props) => {
  const { billingDetails, onClick, sx = {} } = props;

  return (
    <Stack
      spacing={0.5}
      component={ListItemButton}
      onClick={onClick}
      sx={{
        py: 1,
        px: 1.5,
        borderRadius: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        boxShadow: (theme) => `0 0 0 1px ${theme.palette.text.disabled}`,
        ...sx,
      }}
    >
      <Stack width="100%" direction="row" alignItems="start" justifyContent="space-between">
        <Typography variant="subtitle2">
          {billingDetails?.fullName || 'Select Billing Details'}
        </Typography>

        {ICONS.dropdown()}
      </Stack>
      {billingDetails && (
        <>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {getWarehouseAddress(billingDetails.address)}
          </Typography>

          {billingDetails.phoneNumber && (
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {billingDetails.phoneNumber}
            </Typography>
          )}
        </>
      )}
    </Stack>
  );
};

BillingDetails.propTypes = BillingDetailsProps;

export default BillingDetails;
