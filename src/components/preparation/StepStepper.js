'use client';

import { memo, useCallback } from 'react';

function StepStepper({ steps = [], currentStep, completedSteps = [], onNext, onPrev, onStepClick, onComplete }) {
  if (!steps.length) return null;

  const current = steps[currentStep];
  const isLast = currentStep === steps.length - 1;
  const isFirst = currentStep === 0;

  const trackBy = useCallback((step) => step.id, []);

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
      <div className="flex items-center gap-1 p-4 overflow-x-auto hide-scrollbar border-b border-surface-container-high">
        {steps.map((step, index) => {
          const isComplete = completedSteps.includes(step.id);
          const isCurrent = index === currentStep;
          return (
            <button
              key={trackBy(step)}
              onClick={() => onStepClick(index)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all
                ${isCurrent ? 'bg-primary text-white shadow-md' : ''}
                ${isComplete && !isCurrent ? 'bg-primary/10 text-primary' : ''}
                ${!isCurrent && !isComplete ? 'text-on-surface-variant hover:bg-surface-container-low' : ''}
              `}
              aria-current={isCurrent ? 'step' : undefined}
              aria-label={`Step ${index + 1}: ${step.title}${isComplete ? ' (completed)' : ''}`}
            >
              <span className={`
                w-6 h-6 rounded-full flex items-center justify-center text-xs
                ${isComplete ? 'bg-primary text-white' : isCurrent ? 'bg-white text-primary' : 'bg-surface-container-high text-on-surface-variant'}
              `}>
                {isComplete ? (
                  <span className="material-symbols-outlined text-sm">check</span>
                ) : (
                  index + 1
                )}
              </span>
              <span className="hidden sm:inline">{step.title}</span>
            </button>
          );
        })}
      </div>

      {current && (
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                Step {currentStep + 1} of {steps.length}
              </span>
              <h3 className="text-xl font-headline font-extrabold text-on-surface mt-1">
                {current.title}
              </h3>
            </div>
            {current.duration > 0 && (
              <span className="bg-surface-container-low text-on-surface-variant text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">schedule</span>
                {current.duration} min
              </span>
            )}
          </div>

          <p className="text-on-surface-variant leading-relaxed mb-4">
            {current.instruction}
          </p>

          {current.tips && (
            <div className="bg-tertiary-container/10 border border-tertiary/20 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-tertiary text-lg mt-0.5">lightbulb</span>
                <p className="text-sm text-on-surface-variant">{current.tips}</p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-surface-container-high">
            <button
              onClick={onPrev}
              disabled={isFirst}
              className="px-4 py-2 rounded-lg text-sm font-bold text-on-surface-variant hover:bg-surface-container-low transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              Previous
            </button>

            <button
              onClick={() => onComplete(current.id)}
              className={`
                px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2
                ${completedSteps.includes(current.id)
                  ? 'bg-primary/10 text-primary border-2 border-primary'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high'
                }
              `}
            >
              <span className="material-symbols-outlined text-lg">
                {completedSteps.includes(current.id) ? 'check_circle' : 'radio_button_unchecked'}
              </span>
              {completedSteps.includes(current.id) ? 'Completed' : 'Mark Complete'}
            </button>

            {!isLast ? (
              <button
                onClick={onNext}
                className="px-4 py-2 rounded-lg text-sm font-bold text-primary hover:bg-primary/10 transition-all flex items-center gap-1"
              >
                Next
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            ) : (
              <div className="w-20" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(StepStepper);
