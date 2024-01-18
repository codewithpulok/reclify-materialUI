import { Box, Card, Chip, Link, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
// local components
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

  return (
    <Card
      sx={{
        p: { xs: 1.5, sm: 2 },
        borderRadius: 1,
        '& > .MuiCardActionArea-focusHighlight': {
          background: 'transparent',
        },
        ...sx,
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
        spacing={1.5}
      >
        <Box
          sx={{
            width: '90px',
          }}
        >
          <Image alt={user.displayName} src={user.avatar} ratio="1/1" sx={{ borderRadius: 100 }} />
        </Box>
        <Stack spacing={0.2} sx={{ width: '100%', flex: 1 }}>
          <Stack direction="row" alignItems="center" flexWrap="wrap" spacing={1} mb={0.8}>
            <Typography variant="h6">{user.displayName}</Typography>

            <Label color="primary" size="small" variant="soft" sx={{ mr: 'auto' }}>
              seller
            </Label>

            <Link
              component={RouterLink}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
              href={`${paths.dashboard.messages.root}?id=${user.id}`}
            >
              <Chip
                sx={{ width: { xs: '100%', sm: 'auto' } }}
                icon={ICONS.send_message()}
                label="Send Message"
                variant="outlined"
                clickable
              />
            </Link>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            {ICONS.email(18)}

            <Typography
              variant="body2"
              color="text.primary"
              sx={{ textDecoration: 'none' }}
              component={RouterLink}
              href={`mailto:${user.email}`}
              onClick={(e) => e.stopPropagation()}
            >
              {user.email}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" flexWrap="wrap" spacing={0.5}>
            {ICONS.phone(18)}

            <Typography
              variant="body2"
              color="text.primary"
              sx={{ textDecoration: 'none', mr: 'auto' }}
              component={RouterLink}
              href={`tel:${user.phoneNumber}`}
              onClick={(e) => e.stopPropagation()}
            >
              {user.phoneNumber}
            </Typography>

            {clickable && (
              <Link
                component={RouterLink}
                sx={{ width: { xs: '100%', sm: 'auto' } }}
                href={`${paths.dashboard.users.sellers}/${user.id}`}
              >
                <Chip
                  sx={{ width: { xs: '100%', sm: 'auto' } }}
                  label=" Visit profile"
                  color="primary"
                  clickable
                />
              </Link>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

WarehouseOwnerCard.propTypes = Props;

export default WarehouseOwnerCard;
