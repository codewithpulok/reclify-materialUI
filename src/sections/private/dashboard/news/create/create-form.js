import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import FormProvider from 'src/components/common/hook-form';
import { enqueueSnackbar } from 'src/components/common/snackbar';
import { useBlogCreateMutation } from 'src/redux-toolkit/services/blogApi';
import PostDetailsPreview from '../common/post-details-preview';
import PostFields from '../common/post-fields';
import postSchema from '../common/post-fields/post-schema';

const defaultValues = {
  title: '',
  description: '',
  content: '',
  coverUrl: null,
  isPublished: true,
  allowComment: true,
};

// ----------------------------------------------------------------------

const CreateForm = (props) => {
  const router = useRouter();

  // api state
  const [createBlog] = useBlogCreateMutation();

  // conditional state
  const preview = useBoolean();

  // form state
  const methods = useForm({ resolver: yupResolver(postSchema), defaultValues });
  const { reset, watch, handleSubmit, formState } = methods;
  const { isSubmitting, isValid } = formState;
  const values = watch();

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
      enqueueSnackbar('News Created successfully', { variant: 'error' });
      router.push(paths.dashboard.news.root);
      reset(); // reset form on successfully news create
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <PostFields formType="CREATE" />

      <PostDetailsPreview
        title={values.title}
        content={values.content}
        description={values.description}
        coverUrl={
          typeof values.coverUrl === 'string' ? values.coverUrl : `${values.coverUrl?.preview}`
        }
        //
        open={preview.value}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onClose={preview.onFalse}
        onSubmit={onSubmit}
      />
    </FormProvider>
  );
};

CreateForm.propTypes = {};

export default CreateForm;
