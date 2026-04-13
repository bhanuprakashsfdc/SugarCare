import { useCallback } from 'react';
import { usePreparation } from '@/context/PreparationContext';

export function useChecklist() {
  const { state, dispatch, isStepComplete, isIngredientChecked } = usePreparation();

  const toggleStep = useCallback((stepId) => {
    dispatch({ type: 'TOGGLE_STEP_COMPLETE', payload: stepId });
  }, [dispatch]);

  const toggleIngredient = useCallback((name) => {
    dispatch({ type: 'TOGGLE_INGREDIENT', payload: name });
  }, [dispatch]);

  const completeAllSteps = useCallback((stepIds) => {
    stepIds.forEach(id => {
      if (!state.completedSteps.includes(id)) {
        dispatch({ type: 'COMPLETE_STEP', payload: id });
      }
    });
  }, [dispatch, state.completedSteps]);

  const checkAllIngredients = useCallback((ingredients) => {
    ingredients.forEach(ing => {
      if (!state.checkedIngredients.includes(ing.name)) {
        dispatch({ type: 'TOGGLE_INGREDIENT', payload: ing.name });
      }
    });
  }, [dispatch, state.checkedIngredients]);

  const resetSteps = useCallback(() => {
    if (state.item?.steps) {
      state.item.steps.forEach(step => {
        dispatch({ type: 'UNCOMPLETE_STEP', payload: step.id });
      });
    }
  }, [dispatch, state.item]);

  return {
    completedSteps: state.completedSteps,
    checkedIngredients: state.checkedIngredients,
    toggleStep,
    toggleIngredient,
    isStepComplete,
    isIngredientChecked,
    completeAllSteps,
    checkAllIngredients,
    resetSteps,
  };
}
