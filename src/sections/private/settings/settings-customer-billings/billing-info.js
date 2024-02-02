import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

import { card as creditCards } from 'creditcards';
import {
  ACHInfoListDialog,
  BillingAddressListDialog,
  PaymentCardListDialog,
} from 'src/components/common/custom-dialog';
import { useBoolean } from 'src/hooks/use-boolean';
import { joinAddressObj } from 'src/utils/address';
import { ICONS } from '../config-settings';

// ----------------------------------------------------------------------

const Props = {
  /** @type {PaymentCard} */
  primaryCard: PropTypes.object,
  /** @type {BillingAddress} */
  primaryBillingInfo: PropTypes.object,
  /** @type {ACHType} */
  primaryACH: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns
 */
const BillingInfo = (props) => {
  const { primaryBillingInfo, primaryCard, primaryACH } = props;

  const openAddress = useBoolean();
  const openCards = useBoolean();
  const openACH = useBoolean();

  const [selectedBillingInfo, setSelectedBillingInfo] = useState(undefined);
  const [selectedCard, setSelectedCard] = useState(undefined);
  const [selectedACH, setSelectedACH] = useState(undefined);

  const handleSelectAddress = useCallback((newValue) => {
    setSelectedBillingInfo(newValue);
  }, []);

  const handleSelectCard = useCallback((newValue) => {
    setSelectedCard(newValue);
  }, []);

  const handleSelectACH = useCallback((newValue) => {
    setSelectedACH(newValue);
  }, []);

  // handle loading, empty, success state for billng info
  useEffect(() => {
    setSelectedBillingInfo(primaryBillingInfo);
  }, [primaryBillingInfo]);

  // handle loading, empty, success state for card
  useEffect(() => {
    setSelectedCard(primaryCard);
  }, [primaryCard]);

  // handle loading, empty, success state for ach
  useEffect(() => {
    setSelectedACH(primaryACH);
  }, [primaryACH]);

  return (
    <>
      <Card>
        <CardHeader sx={{ mb: 3 }} title="Billing Info" />

        <Stack spacing={1.5} sx={{ p: 3, pt: 0, typography: 'body2' }}>
          <Grid container spacing={{ xs: 0.5, md: 2 }} alignItems="center">
            <Grid xs={12} md={4} sx={{ color: 'text.secondary' }}>
              Billing name
            </Grid>
            <Grid xs={12} md={8}>
              <Button
                onClick={openAddress.onTrue}
                endIcon={ICONS.showMore(16)}
                variant="outlined"
                size="small"
                sx={{ typography: 'subtitle2' }}
                disabled={selectedBillingInfo === undefined}
              >
                {selectedBillingInfo === undefined && 'Loading'}
                {selectedBillingInfo !== undefined && !selectedBillingInfo && 'Not Selected'}
                {selectedBillingInfo && selectedBillingInfo?.fullName}
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={{ xs: 0.5, md: 2 }}>
            <Grid xs={12} md={4} sx={{ color: 'text.secondary' }}>
              Billing address
            </Grid>
            <Grid xs={12} md={8} sx={{ color: 'text.secondary' }}>
              {joinAddressObj(selectedBillingInfo?.address) || '-'}
            </Grid>
          </Grid>

          <Grid container spacing={{ xs: 0.5, md: 2 }}>
            <Grid xs={12} md={4} sx={{ color: 'text.secondary' }}>
              Billing phone number
            </Grid>
            <Grid xs={12} md={8} sx={{ color: 'text.secondary' }}>
              {selectedBillingInfo?.phoneNumber || '-'}
            </Grid>
          </Grid>

          <Grid container spacing={{ xs: 0.5, md: 2 }} alignItems="center">
            <Grid xs={12} md={4} sx={{ color: 'text.secondary' }}>
              Payment method
            </Grid>
            <Grid xs={12} md={8}>
              <Button
                onClick={openCards.onTrue}
                endIcon={ICONS.showMore(16)}
                variant="outlined"
                size="small"
                sx={{ typography: 'subtitle2' }}
                disabled={selectedCard === undefined}
              >
                {selectedCard === undefined && 'Loading'}
                {selectedCard !== undefined && !selectedCard && 'Not Selected'}
                {selectedCard && creditCards.format(selectedCard?.cardNumber)}
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={{ xs: 0.5, md: 2 }} alignItems="center">
            <Grid xs={12} md={4} sx={{ color: 'text.secondary' }}>
              ACH Info
            </Grid>
            <Grid xs={12} md={8}>
              <Button
                onClick={openACH.onTrue}
                endIcon={ICONS.showMore(16)}
                variant="outlined"
                size="small"
                sx={{ typography: 'subtitle2' }}
                disabled={selectedCard === undefined}
              >
                {selectedACH === undefined && 'Loading'}
                {selectedACH !== undefined && !selectedACH && 'Not Selected'}
                {selectedACH && `${selectedACH?.accountNumber}`}
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Card>

      <PaymentCardListDialog
        open={openCards.value}
        onClose={openCards.onFalse}
        selected={(selectedId) => selectedCard?.id === selectedId}
        onSelect={handleSelectCard}
      />

      <BillingAddressListDialog
        open={openAddress.value}
        onClose={openAddress.onFalse}
        selected={(selectedId) => selectedBillingInfo?.id === selectedId}
        onSelect={handleSelectAddress}
      />

      <ACHInfoListDialog
        open={openACH.value}
        onClose={openACH.onFalse}
        selected={(selectedId) => selectedACH?.id === selectedId}
        onSelect={handleSelectACH}
      />
    </>
  );
};

BillingInfo.propTypes = Props;

export default BillingInfo;
