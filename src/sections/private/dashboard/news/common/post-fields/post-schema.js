import * as Yup from 'yup';

const shape = {
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  content: Yup.string().required('Content is required'),
  coverUrl: Yup.string().nullable().required('Cover is required'),
  isPublished: Yup.bool().label('Post Status').required().default(true),
  allowComment: Yup.bool().label('Allow Comment').required().default(true),
};

const postSchema = Yup.object().shape(shape);

export default postSchema;
