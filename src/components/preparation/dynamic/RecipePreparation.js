'use client';

import { useCallback, useMemo, useState } from 'react';
import { usePreparation } from '@/context/PreparationContext';
import SkeletonLoader from '../SkeletonLoader';
import Breadcrumb from '../Breadcrumb';
import StepStepper from '../StepStepper';
import IngredientList from '../IngredientList';
import NutritionPanel from '../NutritionPanel';
import TimerWidget from '../TimerWidget';
import ServingAdjuster from '../ServingAdjuster';
import UnitConverter from '../UnitConverter';
import ShoppingListGenerator from '../ShoppingListGenerator';
import CollapsiblePanel from '../CollapsiblePanel';
import ReviewSection from '../ReviewSection';

export default function RecipePreparation() {
  const { state, dispatch, addToast, saveState, progress } = usePreparation();
  const [activePanel, setActivePanel] = useState(null);

  const { item } = state;

  const handleNext = useCallback(() => {
    dispatch({ type: 'NEXT_STEP' });
  }, [dispatch]);

  const handlePrev = useCallback(() => {
    dispatch({ type: 'PREV_STEP' });
  }, [dispatch]);

  const handleComplete = useCallback((stepId) => {
    dispatch({ type: 'TOGGLE_STEP_COMPLETE', payload: stepId });
  }, [dispatch]);

  const handleSave = useCallback(() => {
    saveState();
    addToast('Progress saved', 'success');
  }, [saveState, addToast]);

  const handleServingsChange = useCallback((value) => {
    dispatch({ type: 'SET_SERVINGS', payload: value });
  }, [dispatch]);

  const handleUnitToggle = useCallback(() => {
    dispatch({ type: 'TOGGLE_UNIT' });
  }, [dispatch]);

  const scaledIngredients = useMemo(() => {
    if (!item?.ingredients) return [];
    const scale = state.servings / (item.servings || 1);
    return item.ingredients.map(ing => ({
      ...ing,
      quantity: Math.round(ing.quantity * scale * 100) / 100,
      metric: {
        qty: Math.round(ing.metric.qty * scale * 100) / 100,
        unit: ing.metric.unit,
      },
    }));
  }, [item, state.servings]);

  if (state.loading) return <SkeletonLoader />;
  if (!item) return <div className="p-8 text-center text-on-surface-variant">Recipe not found.</div>;

  const currentStepData = item.steps?.[state.currentStep];

  return (
    <div className="animate-fade-in-up">
      <Breadcrumb
        items={[
          { label: 'Weekly Plan', href: '/weekly-plan' },
          { label: item.planId?.charAt(0).toUpperCase() + item.planId?.slice(1), href: `/weekly-plan#${item.planId}` },
          { label: item.name },
        ]}
      />

      <div className="mb-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-headline font-extrabold text-on-surface tracking-tight">
              {item.name}
            </h1>
            <p className="text-on-surface-variant mt-2 max-w-2xl">{item.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">{item.tag}</span>
            <span className="bg-surface-container-low text-on-surface-variant text-xs font-bold px-3 py-1 rounded-full">
              {item.difficulty}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 mt-6 text-sm text-on-surface-variant">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-lg">schedule</span>
            <span>Prep: {item.prepTime} min</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-lg">local_fire_department</span>
            <span>Cook: {item.cookTime} min</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-lg">group</span>
            <span>{state.servings} serving{state.servings > 1 ? 's' : ''}</span>
          </div>
        </div>

        <div className="mt-4 w-full bg-surface-container-low rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-on-surface-variant mt-1">{progress}% complete</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-4 space-y-6">
          <CollapsiblePanel title="Ingredients" icon="grocery" defaultOpen>
            <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
              <ServingAdjuster servings={state.servings} onChange={handleServingsChange} />
              <UnitConverter unitSystem={state.unitSystem} onToggle={handleUnitToggle} />
            </div>
            <IngredientList
              ingredients={scaledIngredients}
              unitSystem={state.unitSystem}
            />
          </CollapsiblePanel>

          <CollapsiblePanel title="Nutrition" icon="monitoring">
            <NutritionPanel nutrition={item.nutrition} servings={state.servings} baseServings={item.servings} />
          </CollapsiblePanel>

          <CollapsiblePanel title="Tips & Substitutions" icon="lightbulb">
            {item.tips?.length > 0 && (
              <div className="mb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Pro Tips</h4>
                <ul className="space-y-2">
                  {item.tips.map((tip, i) => (
                    <li key={i} className="flex gap-2 text-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {item.substitutions?.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-secondary mb-2">Substitutions</h4>
                <ul className="space-y-2">
                  {item.substitutions.map((sub, i) => (
                    <li key={i} className="text-sm text-on-surface-variant">
                      <span className="line-through text-error/60">{sub.from}</span>
                      <span className="mx-2">→</span>
                      <span className="text-primary font-medium">{sub.to}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CollapsiblePanel>

          <ShoppingListGenerator ingredients={scaledIngredients} />
        </aside>

        <div className="lg:col-span-8 space-y-6">
          <StepStepper
            steps={item.steps}
            currentStep={state.currentStep}
            completedSteps={state.completedSteps}
            onNext={handleNext}
            onPrev={handlePrev}
            onStepClick={(idx) => dispatch({ type: 'SET_STEP', payload: idx })}
            onComplete={handleComplete}
          />

          {currentStepData?.duration > 0 && (
            <TimerWidget duration={currentStepData.duration * 60} stepId={currentStepData.id} />
          )}

          <ReviewSection />

          <div className="flex justify-end gap-3">
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-primary text-white rounded-xl font-headline font-bold shadow-md hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">save</span>
              Save Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
