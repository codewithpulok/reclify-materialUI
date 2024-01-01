import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

import { useBoolean } from 'src/hooks/use-boolean';

import {
  BillingAddressListDialog,
  PaymentCardListDialog,
} from 'src/components/user-settings/dialog';

import { getWarehouseAddress } from 'src/components/warehouse/utils';
import { ICONS } from '../config-settings';

// ----------------------------------------------------------------------

const BillingInfoProps = {
  /** @type {BillingAddress[]} */
  addressBook: PropTypes.array.isRequired,
  /** @type {PaymentCard[]} */
  paymentCards: PropTypes.array.isRequired,
};

/**
 * @param {BillingInfoProps} props
 * @returns
 */
const BillingInfo = (props) => {
  const { addressBook, paymentCards } = props;

  const primaryAddress = useMemo(
    () => addressBook.find((address) => address.primary),
    [addressBook]
  );
  const primaryCard = useMemo(() => paymentCards.find((card) => card.primary), [paymentCards]);

  const openAddress = useBoolean();
  const openCards = useBoolean();

  const [selectedAddress, setSelectedAddress] = useState(primaryAddress);

  const [selectedCard, setSelectedCard] = useState(primaryCard);

  const handleSelectAddress = useCallback((newValue) => {
    setSelectedAddress(newValue);
  }, []);

  const handleSelectCard = useCallback((newValue) => {
    setSelectedCard(newValue);
  }, []);

  return (
    <>
      <Card>
        <CardHeader sx={{ mb: 3 }} title="Billing Info" />

        <Stack spacing={2} sx={{ p: 3, pt: 0, typography: 'body2' }}>
          <Grid container spacing={{ xs: 0.5, md: 2 }}>
            <Grid xs={12} md={4} sx={{ color: 'text.secondary' }}>
              Billing name
            </Grid>
            <Grid xs={12} md={8}>
              <Button
                onClick={openAddress.onTrue}
                endIcon={ICONS.showMore(16)}
                sx={{ typography: 'subtitle2', p: 0, borderRadius: 0 }}
              >
                {selectedAddress?.fullName}
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={{ xs: 0.5, md: 2 }}>
            <Grid xs={12} md={4} sx={{ color: 'text.secondary' }}>
              Billing address
            </Grid>
            <Grid xs={12} md={8} sx={{ color: 'text.secondary' }}>
              {getWarehouseAddress(selectedAddress?.address)}
            </Grid>
          </Grid>

          <Grid container spacing={{ xs: 0.5, md: 2 }}>
            <Grid xs={12} md={4} sx={{ color: 'text.secondary' }}>
              Billing phone number
            </Grid>
            <Grid xs={12} md={8} sx={{ color: 'text.secondary' }}>
              {selectedAddress?.phoneNumber}
            </Grid>
          </Grid>

          <Grid container spacing={{ xs: 0.5, md: 2 }}>
            <Grid xs={12} md={4} sx={{ color: 'text.secondary' }}>
              Payment method
            </Grid>
            <Grid xs={12} md={8}>
              <Button
                onClick={openCards.onTrue}
                endIcon={ICONS.showMore(16)}
                sx={{ typography: 'subtitle2', p: 0, borderRadius: 0 }}
              >
                {selectedCard?.cardNumber}
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Card>

      <PaymentCardListDialog
        list={paymentCards}
        open={openCards.value}
        onClose={openCards.onFalse}
        selected={(selectedId) => selectedCard?.id === selectedId}
        onSelect={handleSelectCard}
      />

      <BillingAddressListDialog
        list={addressBook}
        open={openAddress.value}
        onClose={openAddress.onFalse}
        selected={(selectedId) => selectedAddress?.id === selectedId}
        onSelect={handleSelectAddress}
      />
    </>
  );
};

BillingInfo.propTypes = BillingInfoProps;

export default BillingInfo;
