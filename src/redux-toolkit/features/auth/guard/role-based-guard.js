'use client';

import { m } from 'framer-motion';
import PropTypes from 'prop-types';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { ForbiddenIllustration } from 'src/assets/illustrations';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { MotionContainer, varBounce } from 'src/components/common/animate';
import Iconify from 'src/components/common/iconify';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { selectAuth } from '../authSlice';

const Props = {
  children: PropTypes.node,
  hasContent: PropTypes.bool,
  /** @type {UserType[]} */
  roles: PropTypes.arrayOf(PropTypes.string),
  sx: PropTypes.object,
};

// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
export default function RoleBasedGuard(props) {
  const { hasContent, roles, children, sx } = props;
  // Logic here to get current user role
  const { user } = useAppSelector(selectAuth);
  const router = useRouter();

  const currentRole = user?.userType;

  if (typeof roles !== 'undefined' && !roles.includes(currentRole)) {
    return hasContent ? (
      <Container component={MotionContainer} sx={{ textAlign: 'center', ...sx }}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Permission Denied
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            You do not have permission to access this page
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div>

        <m.div variants={varBounce().in}>
          <Button
            variant="contained"
            size="large"
            component={RouterLink}
            href={paths.root}
            fullWidth
          >
            Go to Home
          </Button>
        </m.div>

        <m.div variants={varBounce().in}>
          <Button
            onClick={() => router.back()}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          >
            Back to previous page
          </Button>
        </m.div>
      </Container>
    ) : null;
  }

  return <> {children} </>;
}

RoleBasedGuard.propTypes = Props;
