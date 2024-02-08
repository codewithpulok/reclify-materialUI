import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

import FormProvider from 'src/components/common/hook-form';
import { enqueueSnackbar } from 'src/components/common/snackbar';
import NewsPostFields from 'src/components/news/post-fields';
import postSchema from 'src/components/news/post-fields/post-schema';
import { useBlogCreateMutation } from 'src/redux-toolkit/services/blogApi';

const defaultValues = {
  title: '',
  description: '',
  content: '',
  coverUrl: null,
  isPublished: true,
  isFeatured: false,
  allowComment: true,
};

// ----------------------------------------------------------------------

const CreateForm = (props) => {
  const router = useRouter();

  // api state
  const [createBlog] = useBlogCreateMutation();

  // conditional state
  // const preview = useBoolean();

  // form state
  const methods = useForm({ resolver: yupResolver(postSchema), defaultValues });
  const { reset, handleSubmit } = methods;

  // handle create post
  const onSubmit = async (formValues) => {
    console.log('News Create:', formValues);

    const response = await createBlog(formValues);
    const { data, error } = response;

    // handle error state
    if (error || data?.isError) {
      console.error('Error in news creation: ', response);
      enqueueSnackbar('Error in news creation', { variant: 'error' });
    }

    // handle success state
    else if (data && data?.success) {
      console.warn('News Created successfully: ', response);
      enqueueSnackbar('News Created successfully');
      router.push(paths.dashboard.news.root);
      reset(); // reset form on successfully news create
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <NewsPostFields formType="CREATE" />
    </FormProvider>
  );
};

CreateForm.propTypes = {};

export default CreateForm;
