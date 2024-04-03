'use client';

import { IconButton, MenuItem, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import CustomPopover, { usePopover } from 'src/components/common/custom-popover';
import { ICONS } from '../../config-users';

/**
 * @param {CardActions.propTypes} props
 * @returns {JSX.Element}
 */
const CardActions = (props) => {
  const { onUnverify, onVerify, user } = props;
  const popover = usePopover();

  // components
  const renderMenu = (
    <CustomPopover
      open={popover.open}
      onClose={popover.onClose}
      arrow="top-right"
      sx={{ width: 150 }}
    >
      {onVerify && !user?.isVerified && (
        <MenuItem onClick={() => onVerify(user)}>Verify Seller</MenuItem>
      )}
      {onUnverify && user?.isVerified && (
        <MenuItem onClick={() => onUnverify(user)}>Unverify Seller</MenuItem>
      )}
    </CustomPopover>
  );

  const renderBtn = (
    <Stack direction="row" justifyContent="end" sx={{ position: 'absolute', top: 5, right: 5 }}>
      <IconButton size="small" onClick={popover.onOpen}>
        {ICONS.settings()}
      </IconButton>
    </Stack>
  );

  return (
    <>
      {renderBtn}
      {renderMenu}
    </>
  );
};

CardActions.propTypes = {
  /** @type {User} */
  user: PropTypes.object.isRequired,
  onVerify: PropTypes.func,
  onUnverify: PropTypes.func,
};

export default CardActions;
