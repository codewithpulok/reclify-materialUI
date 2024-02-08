import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

import FormProvider from 'src/components/common/hook-form';
import { enqueueSnackbar } from 'src/components/common/snackbar';
import NewsPostFields from 'src/components/news/post-fields';
import postSchema from 'src/components/news/post-fields/post-schema';
import { useBlogUpdateMutation } from 'src/redux-toolkit/services/blogApi';

// ----------------------------------------------------------------------

const Props = {
  currentPost: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
export default function EditForm(props) {
  const { currentPost } = props;
  const router = useRouter();

  // api state
  const [updateBlog] = useBlogUpdateMutation();

  // conditional state
  // const preview = useBoolean();

  // form state
  const defaultValues = useMemo(
    () => ({
      title: currentPost?.title || '',
      description: currentPost?.description || '',
      content: currentPost?.content || '',
      coverUrl: currentPost?.coverUrl || null,
      isPublished: currentPost?.isPublished || true,
      isFeatured: currentPost?.isFeatured || false,
      allowComment: currentPost?.allowComment || true,
    }),
    [currentPost]
  );
  const methods = useForm({ resolver: yupResolver(postSchema), defaultValues });
  const { reset, handleSubmit } = methods;
  // const { isSubmitting, isValid } = formState;
  // const values = watch();

  // handle create post
  const onSubmit = useCallback(
    async (formValues) => {
      console.log('News Update:', formValues);

      const response = await updateBlog({ id: currentPost?.id, data: formValues });
      const { data, error } = response;

      // handle error state
      if (error || data?.isError) {
        console.error('Error in news update: ', response);
        enqueueSnackbar('Error in news update', { variant: 'error' });
      }

      // handle success state
      else if (data && data?.success) {
        console.warn('News Updated successfully: ', response);
        enqueueSnackbar('News Updated successfully');
        router.push(paths.dashboard.news.root);
        reset(); // reset form on successfully news update
      }
    },
    [currentPost?.id, reset, router, updateBlog]
  );

  useEffect(() => {
    if (currentPost) {
      reset(defaultValues);
    }
  }, [currentPost, defaultValues, reset]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <NewsPostFields formType="EDIT" />
    </FormProvider>
  );
}

EditForm.propTypes = Props;
