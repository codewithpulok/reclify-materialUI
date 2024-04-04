import { Card, CardHeader, Link, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { socialsBrands } from 'src/assets/data';
import { getIconify } from 'src/components/common/iconify/utilities';

/**
 * @param {SocialPart.propTypes} props
 * @returns {JSX.Element}
 */
const SocialPart = (props) => {
  const { user } = props;

  return (
    <Card>
      <CardHeader title="Social Channels:" />

      <Stack spacing={2} sx={{ p: 3 }}>
        {socialsBrands.map((social) => {
          const link = user?.socials?.[social.key] || null;

          const linkArray = link ? link.split('/') : null;
          const username = link ? linkArray[linkArray.length - 1] : null;
          return (
            <Stack
              key={social.key}
              spacing={2}
              direction="row"
              sx={{ wordBreak: 'break-all', typography: 'body2' }}
            >
              {getIconify(social.icon, social.iconSize, {
                flexShrink: 0,
                color: social.color,
              })}

              {link ? (
                <Link href={link} color="inherit">
                  {username}
                </Link>
              ) : (
                'Not Available'
              )}
            </Stack>
          );
        })}
      </Stack>
    </Card>
  );
};

SocialPart.propTypes = {
  /** @type {User} */
  user: PropTypes.object,
};

export default SocialPart;
