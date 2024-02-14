import { Button } from '@mui/material';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

const Props = {};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const VerifyEmailActions = (props) => {
  const { user } = useAppSelector(selectAuth);

  if (user?.isVerified === false) {
    return (
      <Button
        variant="outlined"
        size="small"
        LinkComponent={RouterLink}
        href={paths.auth.email_verify}
      >
        Verfiy Email
      </Button>
    );
  }

  return null;
};

VerifyEmailActions.propTypes = Props;

export default VerifyEmailActions;
