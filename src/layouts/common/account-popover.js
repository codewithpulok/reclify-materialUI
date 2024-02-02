import { m } from 'framer-motion';
import { useMemo } from 'react';
// mui
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
// routes
import { getUserByType } from 'src/assets/dummy';
import { varHover } from 'src/components/common/animate';
import CustomPopover, { usePopover } from 'src/components/common/custom-popover';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { useLogoutMutation } from 'src/redux-toolkit/services/authApi';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { TABS as settingsTabs } from 'src/sections/private/settings/view';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const router = useRouter();

  const { user } = useAppSelector(selectAuth);
  const [logout] = useLogoutMutation();

  const userProfile = getUserByType(user?.userType);

  const popover = usePopover();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      popover.onClose();
      router.replace(paths.auth.login);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickItem = (path) => {
    popover.onClose();
    router.push(path);
  };

  const OPTIONS = useMemo(
    () => [
      {
        label: 'Settings',
        linkTo: false,
        children: [
          ...settingsTabs.map((tab) => {
            let show = true;
            if (tab?.roles && !tab.roles.includes(user?.userType)) show = false;
            // filter service
            if (tab.value === '#warehouses' && user?.serviceType !== 'warehouse') show = false;
            if (tab.value === '#service' && user?.serviceType === 'warehouse') show = false;

            return {
              label: tab.label,
              linkTo: `/settings${tab.value}`,
              show,
            };
          }),
        ],
      },
    ],
    [user]
  );

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(popover.open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={userProfile?.avatar || 'https://i.pravatar.cc/150?u=SophiaMiller'} // For demo
          alt={userProfile?.displayName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        />
      </IconButton>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 200, p: 0 }}>
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {userProfile?.displayName}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <Stack key={option.label}>
              <MenuItem
                disabled={option.linkTo === false}
                onClick={() => handleClickItem(option.linkTo)}
              >
                {option.label}
              </MenuItem>

              {option?.children instanceof Array &&
                option.children.map((childOption) => {
                  // hide the elements that you don't want to show
                  if (!childOption.show) return null;
                  return (
                    <MenuItem
                      key={childOption.label}
                      disabled={childOption.linkTo === false}
                      onClick={() => handleClickItem(childOption.linkTo)}
                    >
                      {childOption.label}
                    </MenuItem>
                  );
                })}
            </Stack>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={handleLogout}
          sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
        >
          Logout
        </MenuItem>
      </CustomPopover>
    </>
  );
}
