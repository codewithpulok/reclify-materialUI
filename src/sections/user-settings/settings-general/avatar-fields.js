import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

import PropTypes from 'prop-types';
import { RHFUploadAvatar } from 'src/components/common/hook-form';

const Props = {
  sx: PropTypes.object,
};
// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const AvatarFields = (props) => {
  const { sx } = props;
  const { setValue } = useFormContext();

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatar', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return <RHFUploadAvatar name="avatar" maxSize={3145728} onDrop={handleDrop} sx={sx} />;
};

AvatarFields.propTypes = Props;

export default AvatarFields;
