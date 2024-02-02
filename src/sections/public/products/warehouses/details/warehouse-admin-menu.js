'use client';

import { LoadingButton } from '@mui/lab';
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback, useMemo, useRef } from 'react';
import { ConfirmDialog } from 'src/components/common/custom-dialog';
import { useBoolean } from 'src/hooks/use-boolean';
import {
  useUpdateWarehouseFeaturedMutation,
  useUpdateWarehouseVerifiedMutation,
  useUpdateWarehouseVisibleMutation,
} from 'src/redux-toolkit/services/adminApi';
import { ICONS } from '../config-warehouse';

const Props = {
  /** @type {Warehouse} */
  warehouse: PropTypes.object,
  id: PropTypes.string.isRequired,
  /** @type {import('@mui/material').MenuProps} */
  menuProps: PropTypes.object,
  /** @type {import('@mui/material').IconButtonProps} */
  iconBtnProps: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const WarehouseAdminMenu = (props) => {
  const { warehouse, menuProps = {}, iconBtnProps = {}, id } = props;
  const { isFeatured, isVerified, isVisible, seller } = warehouse || {};

  const [updateFeatured, featuredResults] = useUpdateWarehouseFeaturedMutation();
  const [updateVerified, verifiedResults] = useUpdateWarehouseVerifiedMutation();
  const [updateVisible, visibleResults] = useUpdateWarehouseVisibleMutation();

  const menu = useBoolean(false);
  const anchorRef = useRef(null);

  const verifyDialog = useBoolean(false);
  const unverifyDialog = useBoolean(false);

  const featuredDialog = useBoolean(false);
  const unfeaturedDialog = useBoolean(false);

  const visibleDialog = useBoolean(false);
  const invisibleDialog = useBoolean(false);

  const openVerifyDialog = useCallback(() => verifyDialog.onTrue(), [verifyDialog]);
  const closeVerifyDialog = useCallback(() => {
    verifyDialog.onFalse();
    menu.onFalse();
  }, [menu, verifyDialog]);

  const openUnverifyDialog = useCallback(() => unverifyDialog.onTrue(), [unverifyDialog]);
  const closeUnverifyDialog = useCallback(() => {
    unverifyDialog.onFalse();
    menu.onFalse();
  }, [menu, unverifyDialog]);

  const openFeaturedDialog = useCallback(() => featuredDialog.onTrue(), [featuredDialog]);
  const closeFeaturedDialog = useCallback(() => {
    featuredDialog.onFalse();
    menu.onFalse();
  }, [featuredDialog, menu]);

  const openUnfeaturedDialog = useCallback(() => unfeaturedDialog.onTrue(), [unfeaturedDialog]);
  const closeUnfeaturedDialog = useCallback(() => {
    unfeaturedDialog.onFalse();
    menu.onFalse();
  }, [menu, unfeaturedDialog]);

  const openVisibleDialog = useCallback(() => visibleDialog.onTrue(), [visibleDialog]);
  const closeVisibleDialog = useCallback(() => {
    visibleDialog.onFalse();
    menu.onFalse();
  }, [menu, visibleDialog]);

  const openInvisibleDialog = useCallback(() => invisibleDialog.onTrue(), [invisibleDialog]);
  const closeInvisibleDialog = useCallback(() => {
    invisibleDialog.onFalse();
    menu.onFalse();
  }, [invisibleDialog, menu]);

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
        disabled: seller?.planId === 'free',
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
      seller,
    ]
  );

  // verifiy handler
  const confirmVerifyDialog = useCallback(async () => {
    const response = await updateVerified({ id, isVerified: true });
    const { data, error } = response;

    // handle error state
    if (error || data?.isError) {
      enqueueSnackbar('Error in verifing warehouse!', { variant: 'error' });
      console.error('Error in verifing warehouse:', response);
    }

    // handle success state
    else if (data?.success) {
      enqueueSnackbar('Warehouse Verified');
      console.warn('Warehouse Verified:', response);
    }

    closeVerifyDialog();
  }, [closeVerifyDialog, id, updateVerified]);

  // unverify handler
  const confirmUnverifyDialog = useCallback(async () => {
    const response = await updateVerified({ id, isVerified: false });
    const { data, error } = response;

    // handle error state
    if (error || data?.isError) {
      enqueueSnackbar('Error in unverifing warehouse!', { variant: 'error' });
      console.error('Error in unverifing warehouse:', response);
    }

    // handle success state
    else if (data?.success) {
      enqueueSnackbar('Warehouse Unverified');
      console.warn('Warehouse Unverified:', response);
    }

    closeUnverifyDialog();
  }, [closeUnverifyDialog, id, updateVerified]);

  // featured handler
  const confirmFeaturedDialog = useCallback(async () => {
    const response = await updateFeatured({ id, isFeatured: true });
    const { data, error } = response;

    // handle error state
    if (error || data?.isError) {
      enqueueSnackbar('Error in featured warehouse!', { variant: 'error' });
      console.error('Error in featured warehouse:', response);
    }

    // handle success state
    else if (data?.success) {
      enqueueSnackbar('Warehouse Featured');
      console.warn('Warehouse Featured:', response);
    }

    closeFeaturedDialog();
  }, [closeFeaturedDialog, id, updateFeatured]);

  // unfeatured handler
  const confirmUnfeaturedDialog = useCallback(async () => {
    const response = await updateFeatured({ id, isFeatured: false });
    const { data, error } = response;

    // handle error state
    if (error || data?.isError) {
      enqueueSnackbar('Error in unfeatured warehouse!', { variant: 'error' });
      console.error('Error in unfeatured warehouse:', response);
    }

    // handle success state
    else if (data?.success) {
      enqueueSnackbar('Warehouse Unfeatured');
      console.warn('Warehouse Unfeatured:', response);
    }

    closeUnfeaturedDialog();
  }, [closeUnfeaturedDialog, id, updateFeatured]);

  // visible handler
  const confirmVisibleDialog = useCallback(async () => {
    const response = await updateVisible({ id, visible: true });
    const { data, error } = response;

    // handle error state
    if (error || data?.isError) {
      enqueueSnackbar('Error in visible warehouse!', { variant: 'error' });
      console.error('Error in visible warehouse:', response);
    }

    // handle success state
    else if (data?.success) {
      enqueueSnackbar('Warehouse Visibled');
      console.warn('Warehouse Visibled:', response);
    }

    closeVisibleDialog();
  }, [closeVisibleDialog, id, updateVisible]);

  // hidden handler
  const confirmHiddenDialog = useCallback(async () => {
    const response = await updateVisible({ id, visible: false });
    const { data, error } = response;

    // handle error state
    if (error || data?.isError) {
      enqueueSnackbar('Error in hide warehouse!', { variant: 'error' });
      console.error('Error in hide warehouse:', response);
    }

    // handle success state
    else if (data?.success) {
      enqueueSnackbar('Warehouse Hidden');
      console.warn('Warehouse Hidden:', response);
    }

    closeInvisibleDialog();
  }, [closeInvisibleDialog, id, updateVisible]);

  return (
    <div>
      <IconButton ref={anchorRef} onClick={menu.onToggle} {...iconBtnProps}>
        {ICONS.adminSettings()}
      </IconButton>
      <Menu
        open={menu.value}
        onClose={menu.onFalse}
        anchorEl={anchorRef?.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          mt: 1,
        }}
        {...menuProps}
      >
        <MenuList sx={{ minWidth: '250px' }}>
          {items.map((item, index) => {
            if (!item.show) return null;
            return (
              <MenuItem key={index} onClick={item.aciton} disabled={item?.disabled}>
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
          <LoadingButton
            loading={verifiedResults.isLoading}
            color="primary"
            variant="contained"
            onClick={confirmVerifyDialog}
          >
            Confirm
          </LoadingButton>
        }
      />

      {/* Unverified Dialog */}
      <ConfirmDialog
        open={unverifyDialog.value}
        title="Confirm Remove Verificaiton!"
        content="Are you sure to remove verification from this warehouse?"
        onClose={closeUnverifyDialog}
        action={
          <LoadingButton
            loading={verifiedResults.isLoading}
            color="error"
            variant="contained"
            onClick={confirmUnverifyDialog}
          >
            Confirm
          </LoadingButton>
        }
      />

      {/* Featured Dialog */}
      <ConfirmDialog
        open={featuredDialog.value}
        title="Confirm Feature Warehouse"
        content="Are you sure to feature this warehouse?"
        onClose={closeFeaturedDialog}
        action={
          <LoadingButton
            loading={featuredResults.isLoading}
            color="primary"
            variant="contained"
            onClick={confirmFeaturedDialog}
          >
            Make Featured
          </LoadingButton>
        }
      />

      {/* Unfeatured Dialog */}
      <ConfirmDialog
        open={unfeaturedDialog.value}
        title="Confirm Unfeature Warehouse"
        content="Are you sure to remove featured from this warehouse?"
        onClose={closeUnfeaturedDialog}
        action={
          <LoadingButton
            loading={featuredResults.isLoading}
            color="error"
            variant="contained"
            onClick={confirmUnfeaturedDialog}
          >
            Confirm
          </LoadingButton>
        }
      />

      {/* Visible Dialog */}
      <ConfirmDialog
        open={visibleDialog.value}
        title="Confirm Warehouse Visibilty"
        content="Are you sure to make this warehouse visible?"
        onClose={closeVisibleDialog}
        action={
          <LoadingButton
            loading={visibleResults.isLoading}
            color="primary"
            variant="contained"
            onClick={confirmVisibleDialog}
          >
            Make Visible
          </LoadingButton>
        }
      />

      {/* Invisible Dialog */}
      <ConfirmDialog
        open={invisibleDialog.value}
        title="Confirm Warehouse Visibilty"
        content="Are you sure to make this warehouse invisible?"
        onClose={closeInvisibleDialog}
        action={
          <LoadingButton
            loading={visibleResults.isLoading}
            color="error"
            variant="contained"
            onClick={confirmHiddenDialog}
          >
            Confirm
          </LoadingButton>
        }
      />
    </div>
  );
};

WarehouseAdminMenu.propTypes = Props;

export default WarehouseAdminMenu;
