import { LoadingButton } from '@mui/lab';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useBlogDeleteMutation } from 'src/redux-toolkit/services/blogApi';
import ConfirmDialog from '../confirm-dialog';

const Props = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  /** @type {NewsType} */
  news: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const NewsDeleteDialog = (props) => {
  const { onClose, open, news } = props;

  const [deleteBlog, deleteResponse] = useBlogDeleteMutation();

  const handleConfirm = useCallback(async () => {
    console.log('Delete News: ', news);
    const response = await deleteBlog(news?.id);
    const { data, error } = response;

    if (error || data?.isError) {
      enqueueSnackbar('Error in deleting news', { variant: 'error' });
      console.error('News delete error: ', response);
    } else if (!error || data?.success) {
      enqueueSnackbar('News deleted successfully');
      console.warn('News deleted successfully', response);
      onClose();
    }
  }, [deleteBlog, onClose, news]);

  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      title="Delete News Post!"
      content="Are you sure to delete this post? After deleting post, it cannot be undone."
      action={
        <LoadingButton
          loading={deleteResponse?.isLoading}
          onClick={handleConfirm}
          color="error"
          variant="contained"
        >
          Confirm
        </LoadingButton>
      }
    />
  );
};

NewsDeleteDialog.propTypes = Props;

export default NewsDeleteDialog;
