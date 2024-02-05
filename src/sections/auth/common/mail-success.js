import { Stack, Typography } from '@mui/material';
import { EmailInboxIcon } from 'src/assets/icons';

import PropTypes from 'prop-types';

const Props = {
  title: PropTypes.string,
  text: PropTypes.string,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const MailSuccess = (props) => {
  const {
    title = `Email Sent!`,
    text = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, quisquam commodi.
  Obcaecati doloribus ipsam, voluptates similique excepturi ipsa beatae nihil.`,
  } = props;
  return (
    <>
      <EmailInboxIcon sx={{ height: 96 }} />

      <Stack spacing={1} sx={{ my: 5 }}>
        <Typography variant="h3">{title}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {text}
        </Typography>
      </Stack>
    </>
  );
};

MailSuccess.propTypes = Props;

export default MailSuccess;
