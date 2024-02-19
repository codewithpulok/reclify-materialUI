import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

import {
  ACHInfoListDialog,
  BillingAddressListDialog,
  PaymentCardListDialog,
} from 'src/components/common/custom-dialog';
import { LoadingState } from 'src/components/common/custom-state';
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
  isLoading: PropTypes.bool,
};

/**
 * @param {Props} props
 * @returns
 */
const BillingSection = (props) => {
  const { primaryBillingInfo, primaryCard, primaryACH, isLoading } = props;

  const openAddress = useBoolean();
  const openCards = useBoolean();
  const openACH = useBoolean();

  const [selectedBillingInfo, setSelectedBillingInfo] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedACH, setSelectedACH] = useState(null);

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

        {isLoading && <LoadingState />}

        {!isLoading && (
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
                >
                  {!selectedBillingInfo && 'Not Selected'}
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
                >
                  {!selectedCard && 'Not Selected'}
                  {selectedCard && `**** **** **** ${selectedCard?.last4}`}
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
                >
                  {!selectedACH && 'Not Selected'}
                  {selectedACH && `*********${selectedACH?.last4}`}
                </Button>
              </Grid>
            </Grid>
          </Stack>
        )}
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

BillingSection.propTypes = Props;

export default BillingSection;
