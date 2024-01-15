'use client';

import { m } from 'framer-motion';
import PropTypes from 'prop-types';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { ForbiddenIllustration } from 'src/assets/illustrations';

import { MotionContainer, varBounce } from 'src/components/common/animate';
import { useAppSelector } from 'src/redux-toolkit/hooks';
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
      </Container>
    ) : null;
  }

  return <> {children} </>;
}

RoleBasedGuard.propTypes = Props;
