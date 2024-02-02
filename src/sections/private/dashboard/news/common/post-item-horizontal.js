import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';

import { RouterLink } from 'src/routes/components';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

import { useResponsive } from 'src/hooks/use-responsive';

import { fShortenNumber } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';

import CustomPopover, { usePopover } from 'src/components/common/custom-popover';
import Iconify from 'src/components/common/iconify';
import Image from 'src/components/common/image';
import Label from 'src/components/common/label';
import TextMaxLine from 'src/components/common/text-max-line';
import { paramCase } from 'src/utils/change-case';

// ----------------------------------------------------------------------

export default function PostItemHorizontal({ post }) {
  const popover = usePopover();

  const router = useRouter();

  const smUp = useResponsive('up', 'sm');

  const {
    title,
    author,
    publish,
    coverUrl,
    createdAt,
    totalViews,
    totalShares,
    totalComments,
    description,
  } = post;

  return (
    <>
      <Stack component={Card} direction="row">
        <Stack
          sx={{
            p: (theme) => theme.spacing(3, 3, 2, 3),
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Label variant="soft" color={(publish === 'published' && 'info') || 'default'}>
                {publish}
              </Label>

              <Box component="span" sx={{ typography: 'caption', color: 'text.disabled' }}>
                {fDate(createdAt)}
              </Box>
            </Stack>

            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-horizontal-fill" />
            </IconButton>
          </Stack>

          <Stack spacing={1} flexGrow={1}>
            <Link
              color="inherit"
              component={RouterLink}
              href={paths.dashboard.news.details(paramCase(title))}
            >
              <TextMaxLine variant="subtitle2" line={2}>
                {title}
              </TextMaxLine>
            </Link>

            <TextMaxLine variant="body2" sx={{ color: 'text.secondary' }}>
              {description}
            </TextMaxLine>
          </Stack>

          <Stack direction="row" alignItems="center">
            <Stack
              spacing={1.5}
              flexGrow={1}
              direction="row"
              flexWrap="wrap"
              justifyContent="flex-end"
              sx={{
                typography: 'caption',
                color: 'text.disabled',
              }}
            >
              <Stack direction="row" alignItems="center">
                <Iconify icon="eva:message-circle-fill" width={16} sx={{ mr: 0.5 }} />
                {fShortenNumber(totalComments)}
              </Stack>

              <Stack direction="row" alignItems="center">
                <Iconify icon="solar:eye-bold" width={16} sx={{ mr: 0.5 }} />
                {fShortenNumber(totalViews)}
              </Stack>

              <Stack direction="row" alignItems="center">
                <Iconify icon="solar:share-bold" width={16} sx={{ mr: 0.5 }} />
                {fShortenNumber(totalShares)}
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        {smUp && (
          <Box
            sx={{
              width: 180,
              height: 240,
              position: 'relative',
              flexShrink: 0,
              p: 1,
            }}
          >
            <Avatar
              alt={author.name}
              src={author.avatarUrl}
              sx={{ position: 'absolute', top: 16, right: 16, zIndex: 9 }}
            />
            <Image alt={title} src={coverUrl} sx={{ height: 1, borderRadius: 1.5 }} />
          </Box>
        )}
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="top-right"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
            router.push(paths.dashboard.news.details(paramCase(title)));
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            router.push(paths.dashboard.news.edit(paramCase(title)));
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>
    </>
  );
}

PostItemHorizontal.propTypes = {
  post: PropTypes.shape({
    author: PropTypes.object,
    coverUrl: PropTypes.string,
    createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    description: PropTypes.string,
    publish: PropTypes.string,
    title: PropTypes.string,
    totalComments: PropTypes.number,
    totalShares: PropTypes.number,
    totalViews: PropTypes.number,
  }),
};
