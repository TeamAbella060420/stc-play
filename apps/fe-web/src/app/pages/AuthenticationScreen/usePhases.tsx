import { useEffect, useState, useCallback } from 'react';

const usePhases = (phases: Array<string>, dependencies: [any]) =>
{
  const [currentStep, setCurrentStep] = useState<number>(0);

  console.log(phases, 'Phases');

  useEffect(() => {
    setCurrentStep(0);
  }, dependencies);


  // Use this for debugging purposes only
  const setIndex = (index: number) =>
  {
    const intIndex = Math.floor(index)

    if (-1 < intIndex && intIndex < phases.length)
    {
      setCurrentStep(intIndex);
    }
  };

  const goNext = () => {
    if (currentStep < phases.length - 1) {
      setCurrentStep(step => step + 1);
    }
  };

  const goBack = useCallback(() => {
    setCurrentStep(prev => {
      if (prev === 0) return prev;
      return prev - 1
    })

    // window.location.reload();
  }, [currentStep]);

  const goToState = (stateName: string) =>
  {
    const phaseIndex =  phases.findIndex(phase => stateName === phase);

    if (phaseIndex > -1)
    {
      setIndex(phaseIndex)
    }
  }

  useEffect(() => {
    console.log('Steps: ', currentStep);
  }, [currentStep]);



  return {
    index: currentStep,
    currentPhase: phases[currentStep],
    goNext: goNext,
    goBack: goBack,
    setIndex: setIndex,
    goToState: goToState,
  };
};

export default usePhases;
