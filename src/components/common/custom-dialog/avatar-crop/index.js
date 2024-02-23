import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slider,
  Stack,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import Label from '../../label';
import getCroppedImg from './helpers';

// ----------------------------------------------------------------------

const Props = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  img: PropTypes.string,
  croppedCallback: PropTypes.func,
};

// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const AvatarCrop = (props) => {
  const { onClose, open, img, croppedCallback = () => {} } = props;

  // app state
  const [rotation, setRotation] = useState(0);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // update area pixel
  const onCropComplete = (croppedArea, CAPixels) => {
    setCroppedAreaPixels(CAPixels);
  };

  // generate cropped image
  const onSubmit = useCallback(async () => {
    const cropped = await getCroppedImg(img, croppedAreaPixels, rotation);
    croppedCallback(cropped);
  }, [croppedAreaPixels, croppedCallback, img, rotation]);

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle>Crop Image</DialogTitle>
      <DialogContent>
        <Stack>
          <Box position="relative" width="100%" height="400px">
            <Cropper
              image={img}
              crop={crop}
              zoom={zoom}
              aspect={1 / 1}
              rotation={rotation}
              onRotationChange={setRotation}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              cropShape="round"
              showGrid
            />
          </Box>

          <Stack spacing={1} mt={2}>
            <Stack alignItems="start">
              <Label>Zoom</Label>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e, z) => setZoom(z)}
              />
            </Stack>
            <Stack alignItems="start">
              <Label>Rotation</Label>
              <Slider
                value={rotation}
                min={0}
                max={360}
                step={1}
                aria-labelledby="Rotation"
                onChange={(e, r) => setRotation(r)}
              />
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={onSubmit}>
          Crop
        </Button>

        <Button color="error" variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AvatarCrop.propTypes = Props;

export default AvatarCrop;

// ----------------------------------------------------------------------
