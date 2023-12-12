'use client';

import { Grid } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { warehouses } from 'src/assets/dummy/warehouses';
import { ConfirmationAlert } from 'src/components/alert';
import { WarehouseCard } from 'src/components/cards';

import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

export default function ListingView() {
  const settings = useSettingsContext();
  const [confirmation, setConfirmation] = useState({ open: false, title: '', text: '' });

  const handleDelete = (warehouse) => {
    setConfirmation({
      open: true,
      title: `Are you sure to delete ${warehouse.name} warehouse`,
      text: 'After deleting warehouse, it cannot be undone.',
    });
  };

  const onDeleteDisagree = () => {
    setConfirmation((prev) => ({ ...prev, open: false }));
  };

  const onDeleteAgree = () => {
    setConfirmation((prev) => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" mb={3}>
        Listing
      </Typography>

      <Grid container spacing={2}>
        {warehouses.map((warehouse) => (
          <Grid item key={warehouse.id} xs={12} md={6} lg={4}>
            <WarehouseCard
              key={warehouse.id}
              image={warehouse.photos[0].coverUrl}
              location={warehouse.location}
              name={warehouse.name}
              onDelete={() => handleDelete(warehouse)}
              id={warehouse.id}
            />
          </Grid>
        ))}
      </Grid>

      <ConfirmationAlert
        open={confirmation.open}
        onAgree={onDeleteAgree}
        onDisagree={onDeleteDisagree}
        onClose={onDeleteDisagree}
        title={confirmation?.title}
        text={confirmation?.text}
      />
    </Container>
  );
}
