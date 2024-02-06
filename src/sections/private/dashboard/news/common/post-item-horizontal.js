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
import { PLACEHOLDER_NEWS_COVER } from 'src/config-global';

// ----------------------------------------------------------------------

const Props = {
  /** @type {NewsType} */
  post: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
export default function PostItemHorizontal(props) {
  const { post, onDelete } = props;
  const {
    author,
    coverUrl,
    description,
    id,
    title,
    isPublished,
    createdAt,
    totalComments = 10,
    totalViews = 100,
  } = post;
  const cover = coverUrl || PLACEHOLDER_NEWS_COVER;

  const router = useRouter();
  const smUp = useResponsive('up', 'sm');

  const popover = usePopover();

  // handle delete
  const handleDelete = () => {
    popover.onClose();
    onDelete();
  };

  // handle edit
  const handleEdit = () => {
    popover.onClose();
    router.push(paths.dashboard.news.edit(id));
  };

  // handle view
  const handleView = () => {
    popover.onClose();
    router.push(paths.dashboard.news.details(id));
  };

  return (
    <>
      <Stack component={Card} direction="row" sx={{ width: 1 }}>
        <Stack
          sx={{
            p: (theme) => theme.spacing(3, 3, 2, 3),
            flexGrow: 1,
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Label variant="soft" color={isPublished ? 'info' : 'default'}>
                {isPublished ? 'published' : 'draft'}
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
            <Link color="inherit" component={RouterLink} href={paths.dashboard.news.details(id)}>
              <TextMaxLine variant="subtitle2" line={2}>
                {title}
              </TextMaxLine>
            </Link>

            <TextMaxLine line={4} variant="body2" sx={{ color: 'text.secondary' }}>
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
              alt={`${author.firstName} ${author.lastName}`}
              src={author.avatar}
              sx={{ position: 'absolute', top: 16, right: 16, zIndex: 9 }}
            />
            <Image alt={title} src={cover} sx={{ height: 1, borderRadius: 1.5 }} />
          </Box>
        )}
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="top-right"
        sx={{ width: 140 }}
      >
        <MenuItem onClick={handleView}>
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>

        <MenuItem onClick={handleEdit}>
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>
    </>
  );
}

PostItemHorizontal.propTypes = Props;
