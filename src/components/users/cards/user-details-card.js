import { Avatar, Card, Chip, IconButton, Link, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
// local components
import { socialsBrands } from 'src/assets/data';
import { getIconify } from 'src/components/common/iconify/utilities';
import Label from 'src/components/common/label';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { ICONS } from '../config-users';

const Props = {
  /** @type {User} */
  user: PropTypes.object.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const UserDetailsCard = (props) => {
  const { user, sx } = props;

  return (
    <Card
      component={Stack}
      sx={{
        // card
        p: { xs: 1.5, sm: 2 },
        borderRadius: 1,

        // stack
        flexDirection: {
          xs: 'column',
          sm: 'row',
        },
        alignItems: {
          xs: 'start',
          sm: 'center',
        },
        gap: 1.5,

        ...sx,
      }}
    >
      <Avatar src={user.avatar} alt={user.displayName} sx={{ width: 90, height: 90 }} />
      <Stack spacing={0.2} sx={{ width: '100%', flex: 1 }}>
        <Stack direction="row" alignItems="center" flexWrap="wrap" spacing={1} mb={0.8}>
          <Typography variant="h6">{user.displayName}</Typography>

          <Label color="primary" size="small" variant="soft" sx={{ mr: 'auto' }}>
            {user?.userType?.toLowerCase()}
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
            sx={{ textDecoration: 'none' }}
            component={RouterLink}
            href={`tel:${user.phoneNumber}`}
            onClick={(e) => e.stopPropagation()}
          >
            {user.phoneNumber}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" flexWrap="wrap" spacing={0.5} mt={0.5}>
          <Stack direction="row" alignItems="center" spacing={0.3} mr="auto">
            {socialsBrands.map((social) => {
              if (user?.socials?.[social.key] === undefined) return null;

              return (
                <IconButton
                  key={social.key}
                  LinkComponent={RouterLink}
                  href={user.socials[social.key]}
                  size="small"
                  title={social.name}
                >
                  {getIconify(social.icon, social.iconSize, { color: social.color })}
                </IconButton>
              );
            })}
          </Stack>

          <Link
            component={RouterLink}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
            href={`${paths.dashboard.users[user.userType === 'seller' ? 'sellers' : 'customers']}/${
              user.id
            }`}
          >
            <Chip
              sx={{ width: { xs: '100%', sm: 'auto' } }}
              label=" Visit profile"
              color="primary"
              clickable
            />
          </Link>
        </Stack>
      </Stack>
    </Card>
  );
};

UserDetailsCard.propTypes = Props;

export default UserDetailsCard;
