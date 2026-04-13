'use client';

import { usePreparation } from '@/context/PreparationContext';
import SkeletonLoader from '../SkeletonLoader';
import Breadcrumb from '../Breadcrumb';
import StepStepper from '../StepStepper';
import TimerWidget from '../TimerWidget';
import CollapsiblePanel from '../CollapsiblePanel';

export default function WorkoutPreparation() {
  const { state, dispatch, addToast, saveState, progress } = usePreparation();
  const { item } = state;

  if (state.loading) return <SkeletonLoader />;
  if (!item) return <div className="p-8 text-center text-on-surface-variant">Workout not found.</div>;

  return (
    <div className="animate-fade-in-up">
      <Breadcrumb
        items={[
          { label: 'Weekly Plan', href: '/weekly-plan' },
          { label: item.planId?.charAt(0).toUpperCase() + item.planId?.slice(1) },
          { label: item.name },
        ]}
      />
      <h1 className="text-3xl font-headline font-extrabold mb-4">{item.name}</h1>
      <p className="text-on-surface-variant mb-6">{item.description}</p>
      <StepStepper
        steps={item.steps}
        currentStep={state.currentStep}
        completedSteps={state.completedSteps}
        onNext={() => dispatch({ type: 'NEXT_STEP' })}
        onPrev={() => dispatch({ type: 'PREV_STEP' })}
        onStepClick={(idx) => dispatch({ type: 'SET_STEP', payload: idx })}
        onComplete={(id) => dispatch({ type: 'TOGGLE_STEP_COMPLETE', payload: id })}
      />
      <div className="flex justify-end mt-6">
        <button
          onClick={() => { saveState(); addToast('Progress saved', 'success'); }}
          className="px-6 py-3 bg-primary text-white rounded-xl font-headline font-bold"
        >
          Save Progress
        </button>
      </div>
    </div>
  );
}
