import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import PropTypes from 'prop-types';
import { getIconify } from 'src/components/common/iconify/utilities';

const steps = ['Basic Information', 'Features', 'Offering'];
const estimation = {
  0: '1~2 Minutes',
  1: '2~3 Minutes',
  2: '1-2 Minutes',
};

const Props = {
  activeStep: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default function EditStepper({ activeStep, handleBack, handleNext }) {
  const handleClick = (step) => {
    if (step === activeStep - 1) {
      handleBack();
    } else if (step === activeStep + 1) {
      handleNext();
    }
  };

  return (
    <Box sx={{ width: '100%', mb: 8 }}>
      <Stepper sx={{ mb: 3 }} activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step
              key={label}
              {...stepProps}
              onClick={() => handleClick(index)}
              sx={{ cursor: 'pointer' }}
            >
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="center">
        {getIconify('solar:clock-circle-bold-duotone')}
        <Typography>Time Estimation: {estimation[activeStep]}</Typography>
      </Stack>
    </Box>
  );
}

EditStepper.propTypes = Props;
