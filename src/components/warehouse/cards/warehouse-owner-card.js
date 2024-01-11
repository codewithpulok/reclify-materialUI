import { Box, Button, Card, CardActionArea, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import PropTypes from 'prop-types';
// local components
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import Image from 'src/components/common/image';
import Label from 'src/components/common/label';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { ICONS } from '../config-warehouse';

const Props = {
  /** @type {User} */
  user: PropTypes.object.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
  clickable: PropTypes.bool,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const WarehouseOwnerCard = (props) => {
  const { user, sx, clickable = false } = props;
  const router = useRouter();

  const gotoSellerProfile = useCallback(() => {
    router.push(`${paths.dashboard.users.sellers}/${user.id}`);
  }, [user, router]);

  return (
    <Card sx={sx}>
      <CardActionArea
        onClick={clickable ? gotoSellerProfile : undefined}
        sx={{
          p: { xs: 1.5, sm: 2 },
          borderRadius: 1,
          '& > .MuiCardActionArea-focusHighlight': {
            background: 'transparent',
          },
        }}
      >
        <Stack
          sx={{
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            alignItems: 'start',
          }}
          direction="row"
          alignItems="center"
          spacing={1.5}
        >
          <Box
            sx={{
              width: '90px',
            }}
          >
            <Image
              alt={user.displayName}
              src={user.photoURL}
              ratio="1/1"
              sx={{ borderRadius: 100 }}
            />
          </Box>
          <Box sx={{ width: '100%', flex: 1 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.8}>
              <Typography variant="h6">{user.displayName}</Typography>

              <Label color="primary" size="small" variant="soft">
                owner
              </Label>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              {ICONS.email(18)}

              <Typography
                variant="body2"
                color="text.primary"
                sx={{ textDecoration: 'none' }}
                component={Link}
                href={`mailto:${user.email}`}
                onClick={(e) => e.stopPropagation()}
              >
                {user.email}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              {ICONS.phone(18)}

              <Typography
                variant="body2"
                color="text.primary"
                sx={{ textDecoration: 'none' }}
                component={Link}
                href={`tel:${user.phoneNumber}`}
                onClick={(e) => e.stopPropagation()}
              >
                {user.phoneNumber}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5} mt={2} justifyContent="end">
              <Button
                LinkComponent={RouterLink}
                href={`${paths.dashboard.messages.root}?user=${user.id}`}
                color="primary"
                variant="outlined"
                startIcon={ICONS.send_message()}
                size="small"
                onClick={(e) => e.stopPropagation()}
              >
                Send a message
              </Button>
            </Stack>
          </Box>
        </Stack>
      </CardActionArea>
    </Card>
  );
};

WarehouseOwnerCard.propTypes = Props;

export default WarehouseOwnerCard;
