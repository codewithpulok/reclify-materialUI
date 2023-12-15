import { useCallback } from 'react';

import { useFormContext } from 'react-hook-form';

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { fData } from 'src/utils/format-number';

import { RHFUploadAvatar } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const GeneralAvatarFields = (props) => {
  const { setValue } = useFormContext();

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('photoURL', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <Card sx={{ pt: 10, pb: 5, px: 3, textAlign: 'center' }}>
      <RHFUploadAvatar
        name="photoURL"
        maxSize={3145728}
        onDrop={handleDrop}
        helperText={
          <Typography
            variant="caption"
            sx={{
              mt: 3,
              mx: 'auto',
              display: 'block',
              textAlign: 'center',
              color: 'text.disabled',
            }}
          >
            Allowed *.jpeg, *.jpg, *.png, *.gif
            <br /> max size of {fData(3145728)}
          </Typography>
        }
      />
    </Card>
  );
};

GeneralAvatarFields.propTypes = {};

export default GeneralAvatarFields;
