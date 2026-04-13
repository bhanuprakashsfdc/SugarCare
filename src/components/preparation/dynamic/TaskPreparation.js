'use client';

import { usePreparation } from '@/context/PreparationContext';
import SkeletonLoader from '../SkeletonLoader';
import Breadcrumb from '../Breadcrumb';
import StepStepper from '../StepStepper';

export default function TaskPreparation() {
  const { state, dispatch, addToast, saveState } = usePreparation();
  const { item } = state;

  if (state.loading) return <SkeletonLoader />;
  if (!item) return <div className="p-8 text-center text-on-surface-variant">Task not found.</div>;

  return (
    <div className="animate-fade-in-up">
      <Breadcrumb
        items={[
          { label: 'Weekly Plan', href: '/weekly-plan' },
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
