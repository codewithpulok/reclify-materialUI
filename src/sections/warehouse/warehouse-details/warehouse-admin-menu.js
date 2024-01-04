'use client';

import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { ConfirmDialog } from 'src/components/common/custom-dialog';
import { useBoolean } from 'src/hooks/use-boolean';
import { ICONS } from '../config-warehouse';

const WarehouseAdminMenuProps = {
  isVerified: PropTypes.bool.isRequired,
  isFeatured: PropTypes.bool.isRequired,
  onFeaturedChange: PropTypes.func.isRequired,
  onVerifiedChange: PropTypes.func.isRequired,
};

/**
 * @param {WarehouseAdminMenuProps} props
 * @returns {JSX.Element}
 */
const WarehouseAdminMenu = (props) => {
  const { isFeatured, isVerified, onFeaturedChange, onVerifiedChange } = props;
  const menu = useBoolean(false);
  const [dialog, setDialog] = useState({ title: '', content: '', show: false, callback: () => {} });
  const anchorRef = useRef(null);

  const handleConfirm = () => {
    dialog.callback();
    handleDialog(false);
  };

  const handleDialog = (show, title, content, callback) => {
    setDialog((prev) => {
      const prevDialog = { ...prev };

      if (show !== undefined) prevDialog.show = show;
      if (title !== undefined) prevDialog.title = title;
      if (content !== undefined) prevDialog.content = content;
      if (callback === undefined) {
        prevDialog.callback = () => {};
      } else {
        prevDialog.callback = () => callback;
      }

      return prevDialog;
    });
  };

  const handleFeatured = (value) => {
    let title;
    let content;
    if (value) {
      title = 'Make this featured?';
      content = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic, nostrum.';
    } else {
      title = 'Remove featured badge?';
      content = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic, nostrum.';
    }
    handleDialog(true, title, content, onFeaturedChange(value));
    menu.onFalse();
  };

  const handleVerified = (value) => {
    let title;
    let content;
    if (value) {
      title = 'Make this verified?';
      content = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic, nostrum.';
    } else {
      title = 'Remove verified badge?';
      content = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic, nostrum.';
    }
    handleDialog(true, title, content, onVerifiedChange(value));
    menu.onFalse();
  };

  return (
    <div>
      <IconButton ref={anchorRef} onClick={menu.onToggle}>
        {ICONS.adminSettings()}
      </IconButton>
      <Menu
        open={menu.value}
        onClose={menu.onFalse}
        anchorEl={anchorRef?.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {!isVerified && <MenuItem onClick={() => handleVerified(true)}>Make verified</MenuItem>}
        {!isFeatured && <MenuItem onClick={() => handleFeatured(true)}>Make featured</MenuItem>}
        {isVerified && <MenuItem onClick={() => handleVerified(false)}>Remove verified</MenuItem>}
        {isFeatured && <MenuItem onClick={() => handleFeatured(false)}>Remove featured</MenuItem>}
      </Menu>

      <ConfirmDialog
        title={dialog.title}
        open={dialog.show}
        content={dialog.content}
        onClose={() => handleDialog(false)}
        action={
          <Button color="primary" variant="contained" onClick={handleConfirm}>
            Proceed
          </Button>
        }
      />
    </div>
  );
};

WarehouseAdminMenu.propTypes = WarehouseAdminMenuProps;

export default WarehouseAdminMenu;
