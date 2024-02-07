import PropTypes from 'prop-types';

import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { fShortenNumber } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';

import Iconify from 'src/components/common/iconify';
import TextMaxLine from 'src/components/common/text-max-line';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

const Props = {
  /** @type {NewsType} */
  post: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const NewsCardContent = (props) => {
  const { post } = props;

  return (
    <CardContent
      sx={{
        pt: 6,
        width: 1,
      }}
    >
      <Typography
        variant="caption"
        component="div"
        sx={{
          mb: 1,
          color: 'text.disabled',
        }}
      >
        {fDate(post?.createdAt)}
      </Typography>

      <Link color="inherit" component={RouterLink} href={paths.news.details(post?.id)}>
        <TextMaxLine variant="subtitle2" line={2} persistent>
          {post?.title}
        </TextMaxLine>
      </Link>

      <Stack
        spacing={1.5}
        direction="row"
        justifyContent="flex-end"
        sx={{
          mt: 3,
          typography: 'caption',
          color: 'text.disabled',
        }}
      >
        <Stack direction="row" alignItems="center">
          <Iconify icon="eva:message-circle-fill" width={16} sx={{ mr: 0.5 }} />
          {fShortenNumber(post?.totalComments)}
        </Stack>

        <Stack direction="row" alignItems="center">
          <Iconify icon="solar:eye-bold" width={16} sx={{ mr: 0.5 }} />
          {fShortenNumber(post?.totalViews)}
        </Stack>
      </Stack>
    </CardContent>
  );
};

NewsCardContent.propTypes = Props;

export default NewsCardContent;
