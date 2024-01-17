import { Button, Link } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
// local components
import Label from 'src/components/common/label';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { ICONS } from '../../config-user-settings';

const SellerDetailsCardProps = {
  /** @type {User} */
  seller: PropTypes.object.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};
/**
 * @param {SellerDetailsCardProps} props
 * @returns {JSX.Element}
 */
const SellerDetailsCard = (props) => {
  const { seller, sx = {} } = props;
  return (
    <Stack
      direction="row"
      spacing={1.5}
      sx={{ bgcolor: 'background.default', p: 1.5, borderRadius: 1, ...sx }}
      alignItems="start"
    >
      <Avatar src={seller.avatar} alt={seller.displayName} sx={{ width: 60, height: 60 }} />
      <Stack>
        <Link component={RouterLink} href={`${paths.dashboard.users.sellers}/${seller.id}`}>
          <Typography variant="h6" color="text.primary" mb={0.5}>
            {seller.displayName}
          </Typography>
        </Link>
        <Stack spacing={0}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            {ICONS.phone(18, { color: 'secondary.main' })}
            <Link
              component={RouterLink}
              href={`tel:${seller.phoneNumber}`}
              typography="body2"
              color="text.secondary"
            >
              {seller.phoneNumber}
            </Link>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            {ICONS.email(18, { color: 'secondary.main' })}
            <Link
              component={RouterLink}
              href={`mailto:${seller.email}`}
              typography="body2"
              color="text.secondary"
            >
              {seller.email}
            </Link>
          </Stack>

          <Stack mt={1.5} direction="row" spacing={0.3}>
            <Button
              LinkComponent={RouterLink}
              href={`${paths.dashboard.messages.root}?id=${seller.id}`}
              variant="outlined"
              color="secondary"
              size="small"
              startIcon={ICONS.send_message()}
            >
              send a message
            </Button>
          </Stack>
        </Stack>
      </Stack>

      <Label variant="soft" color="primary" sx={{ alignSelf: 'self-start', ml: 'auto' }}>
        Seller
      </Label>
    </Stack>
  );
};

SellerDetailsCard.propTypes = SellerDetailsCardProps;

export default SellerDetailsCard;
