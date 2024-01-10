'use client';

import {
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useMemo, useRef } from 'react';
import { ConfirmDialog } from 'src/components/common/custom-dialog';
import { useBoolean } from 'src/hooks/use-boolean';
import { ICONS } from '../config-warehouse';

const WarehouseAdminMenuProps = {
  isVerified: PropTypes.bool.isRequired,
  isFeatured: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onFeaturedChange: PropTypes.func.isRequired,
  onVerifiedChange: PropTypes.func.isRequired,
};

/**
 * @param {WarehouseAdminMenuProps} props
 * @returns {JSX.Element}
 */
const WarehouseAdminMenu = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { isFeatured, isVerified, isVisible, onFeaturedChange, onVerifiedChange } = props;
  const menu = useBoolean(false);

  const anchorRef = useRef(null);

  const verifyDialog = useBoolean(false);
  const unverifyDialog = useBoolean(false);

  const featuredDialog = useBoolean(false);
  const unfeaturedDialog = useBoolean(false);

  const visibleDialog = useBoolean(false);
  const invisibleDialog = useBoolean(false);

  const openVerifyDialog = useCallback(() => verifyDialog.onTrue(), [verifyDialog]);
  const closeVerifyDialog = () => verifyDialog.onFalse();

  const openUnverifyDialog = useCallback(() => unverifyDialog.onTrue(), [unverifyDialog]);
  const closeUnverifyDialog = () => unverifyDialog.onFalse();

  const openFeaturedDialog = useCallback(() => featuredDialog.onTrue(), [featuredDialog]);
  const closeFeaturedDialog = () => featuredDialog.onFalse();

  const openUnfeaturedDialog = useCallback(() => unfeaturedDialog.onTrue(), [unfeaturedDialog]);
  const closeUnfeaturedDialog = () => unfeaturedDialog.onFalse();

  const openVisibleDialog = useCallback(() => visibleDialog.onTrue(), [visibleDialog]);
  const closeVisibleDialog = () => visibleDialog.onFalse();

  const openInvisibleDialog = useCallback(() => invisibleDialog.onTrue(), [invisibleDialog]);
  const closeInvisibleDialog = () => invisibleDialog.onFalse();

  const items = useMemo(
    () => [
      {
        name: 'Show this warehouse',
        aciton: openVisibleDialog,
        show: !isVisible,
        icon: ICONS.visible,
      },
      {
        name: 'Hide this warehouse',
        aciton: openInvisibleDialog,
        show: isVisible,
        icon: ICONS.invisible,
      },
      { name: 'Make verified', aciton: openVerifyDialog, show: !isVerified, icon: ICONS.verified },
      {
        name: 'Make featured',
        aciton: openFeaturedDialog,
        show: !isFeatured,
        icon: ICONS.featured,
      },
      {
        name: 'Remove verified',
        aciton: openUnverifyDialog,
        show: isVerified,
        icon: ICONS.unverified,
      },
      {
        name: 'Remove featured',
        aciton: openUnfeaturedDialog,
        show: isFeatured,
        icon: ICONS.unfeatured,
      },
    ],
    [
      isFeatured,
      isVerified,
      isVisible,
      openFeaturedDialog,
      openInvisibleDialog,
      openUnfeaturedDialog,
      openUnverifyDialog,
      openVerifyDialog,
      openVisibleDialog,
    ]
  );

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
        <MenuList sx={{ minWidth: '250px' }}>
          {items.map((item, index) => {
            if (!item.show) return null;
            return (
              <MenuItem key={index} onClick={item.aciton}>
                <ListItemIcon sx={{ mr: 0 }}>{item.icon()}</ListItemIcon>
                <ListItemText>{item.name}</ListItemText>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>

      {/* Verified Dialog */}
      <ConfirmDialog
        open={verifyDialog.value}
        title="Confirm Verification!"
        content="Are you sure to make this warehouse verified?"
        onClose={closeVerifyDialog}
        action={
          <Button color="primary" variant="contained" onClick={closeVerifyDialog}>
            Confirm
          </Button>
        }
      />

      {/* Unverified Dialog */}
      <ConfirmDialog
        open={unverifyDialog.value}
        title="Confirm Remove Verificaiton!"
        content="Are you sure to remove verification from this warehouse?"
        onClose={closeUnverifyDialog}
        action={
          <Button color="error" variant="contained" onClick={closeUnverifyDialog}>
            Confirm
          </Button>
        }
      />

      {/* Featured Dialog */}
      <ConfirmDialog
        open={featuredDialog.value}
        title="Confirm Feature Warehouse"
        content="Are you sure to feature this warehouse?"
        onClose={closeFeaturedDialog}
        action={
          <Button color="primary" variant="contained" onClick={closeFeaturedDialog}>
            Make Featured
          </Button>
        }
      />

      {/* Unfeatured Dialog */}
      <ConfirmDialog
        open={unfeaturedDialog.value}
        title="Confirm Unfeature Warehouse"
        content="Are you sure to remove featured from this warehouse?"
        onClose={closeUnfeaturedDialog}
        action={
          <Button color="error" variant="contained" onClick={closeUnfeaturedDialog}>
            Confirm
          </Button>
        }
      />

      {/* Visible Dialog */}
      <ConfirmDialog
        open={visibleDialog.value}
        title="Confirm Warehouse Visibilty"
        content="Are you sure to make this warehouse visible?"
        onClose={closeVisibleDialog}
        action={
          <Button color="primary" variant="contained" onClick={closeVisibleDialog}>
            Make Visible
          </Button>
        }
      />

      {/* Invisible Dialog */}
      <ConfirmDialog
        open={invisibleDialog.value}
        title="Confirm Warehouse Visibilty"
        content="Are you sure to make this warehouse invisible?"
        onClose={closeInvisibleDialog}
        action={
          <Button color="error" variant="contained" onClick={closeInvisibleDialog}>
            Confirm
          </Button>
        }
      />
    </div>
  );
};

WarehouseAdminMenu.propTypes = WarehouseAdminMenuProps;

export default WarehouseAdminMenu;
