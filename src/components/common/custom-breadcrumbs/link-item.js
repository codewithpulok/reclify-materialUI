import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { RouterLink } from 'src/routes/components';

const Props = {
  activeLast: PropTypes.bool,
  disabled: PropTypes.bool,
  /** @type {BreadcrumbLinkType} */
  link: PropTypes.shape({
    href: PropTypes.string,
    icon: PropTypes.node,
    name: PropTypes.string,
  }),
};
// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
export default function BreadcrumbsLink(props) {
  const { link, activeLast, disabled } = props;
  const styles = {
    typography: 'body2',
    alignItems: 'center',
    color: 'text.primary',
    display: 'inline-flex',
    ...(disabled &&
      !activeLast && {
        cursor: 'default',
        pointerEvents: 'none',
        color: 'text.disabled',
      }),
  };

  const renderContent = (
    <>
      {link.icon && (
        <Box
          component="span"
          sx={{
            mr: 1,
            display: 'inherit',
            '& svg': { width: 20, height: 20 },
          }}
        >
          {link.icon}
        </Box>
      )}

      {link.name}
    </>
  );

  if (link.href) {
    return (
      <Link component={RouterLink} href={link.href} sx={styles}>
        {renderContent}
      </Link>
    );
  }

  return <Box sx={styles}> {renderContent} </Box>;
}

BreadcrumbsLink.propTypes = Props;
