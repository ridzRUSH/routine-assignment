// components/DefaultStepper.js
import React, { useState, useEffect } from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";

export default function DefaultStepper({
  steps,
  activeStep,
  setActiveStep,
  children,
}) {
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(true);

  useEffect(() => {
    setIsLastStep(activeStep === steps - 1);
    setIsFirstStep(activeStep === 0);
  }, [activeStep, steps]);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  return (
    <div className="w-full py-4 px-8">
      <Stepper activeStep={activeStep}>
        {Array.from({ length: steps }).map((_, index) => (
          <Step key={index} onClick={() => setActiveStep(index)}>
            {index + 1}
          </Step>
        ))}
      </Stepper>

      <div className="mt-8">{children}</div>
      <div className="mt-16 flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        <Button onClick={handleNext} disabled={isLastStep}>
          Next
        </Button>
      </div>
    </div>
  );
}
