import { useCallback, useState } from 'react';

const useStepper = (defaultStep = 0, maxStep = 5) => {
  // app states
  const [activeStep, setActiveStep] = useState(defaultStep);

  // go to specific step
  const goTo = useCallback(
    (step) => {
      setActiveStep((prev) => {
        if (step > maxStep || step < 0) return prev;
        return step;
      });
    },
    [maxStep]
  );

  // go to next step
  const goNext = useCallback(() => {
    setActiveStep((prev) => {
      if (prev === maxStep) return prev;
      return prev + 1;
    });
  }, [maxStep]);

  // go back to previous step
  const goBack = useCallback(() => {
    setActiveStep((prev) => {
      if (prev === 0) return prev;

      return prev - 1;
    });
  }, []);

  return {
    activeStep,
    goBack,
    goNext,
    goTo,
  };
};

export default useStepper;
