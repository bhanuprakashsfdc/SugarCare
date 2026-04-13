'use client';

import { createContext, useContext, useReducer, useCallback, useEffect, useRef } from 'react';

const PreparationContext = createContext(null);

const initialState = {
  item: null,
  loading: true,
  error: null,
  currentStep: 0,
  completedSteps: [],
  checkedIngredients: [],
  userNotes: '',
  servings: 1,
  unitSystem: 'imperial',
  timerState: { active: false, seconds: 0, stepId: null },
  shoppingListItems: [],
  dirty: false,
  toasts: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ITEM':
      return { ...state, item: action.payload, loading: false, dirty: false };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_STEP':
      return { ...state, currentStep: action.payload, dirty: true };
    case 'NEXT_STEP': {
      const maxStep = state.item?.steps?.length ? state.item.steps.length - 1 : 0;
      return { ...state, currentStep: Math.min(state.currentStep + 1, maxStep), dirty: true };
    }
    case 'PREV_STEP':
      return { ...state, currentStep: Math.max(state.currentStep - 1, 0), dirty: true };
    case 'COMPLETE_STEP': {
      if (state.completedSteps.includes(action.payload)) return state;
      return {
        ...state,
        completedSteps: [...state.completedSteps, action.payload],
        dirty: true,
      };
    }
    case 'UNCOMPLETE_STEP':
      return {
        ...state,
        completedSteps: state.completedSteps.filter(id => id !== action.payload),
        dirty: true,
      };
    case 'TOGGLE_STEP_COMPLETE': {
      const isComplete = state.completedSteps.includes(action.payload);
      return {
        ...state,
        completedSteps: isComplete
          ? state.completedSteps.filter(id => id !== action.payload)
          : [...state.completedSteps, action.payload],
        dirty: true,
      };
    }
    case 'TOGGLE_INGREDIENT': {
      const isChecked = state.checkedIngredients.includes(action.payload);
      return {
        ...state,
        checkedIngredients: isChecked
          ? state.checkedIngredients.filter(name => name !== action.payload)
          : [...state.checkedIngredients, action.payload],
        dirty: true,
      };
    }
    case 'SET_NOTES':
      return { ...state, userNotes: action.payload, dirty: true };
    case 'SET_SERVINGS':
      return { ...state, servings: Math.max(1, action.payload), dirty: true };
    case 'TOGGLE_UNIT':
      return { ...state, unitSystem: state.unitSystem === 'imperial' ? 'metric' : 'imperial', dirty: true };
    case 'SET_UNIT':
      return { ...state, unitSystem: action.payload, dirty: true };
    case 'TIMER_START':
      return { ...state, timerState: { active: true, seconds: action.payload.seconds, stepId: action.payload.stepId } };
    case 'TIMER_TICK':
      if (!state.timerState.active) return state;
      if (state.timerState.seconds <= 0) return { ...state, timerState: { active: false, seconds: 0, stepId: null } };
      return { ...state, timerState: { ...state.timerState, seconds: state.timerState.seconds - 1 } };
    case 'TIMER_STOP':
      return { ...state, timerState: { active: false, seconds: 0, stepId: null } };
    case 'ADD_TO_SHOPPING_LIST': {
      const existing = state.shoppingListItems.find(i => i.name === action.payload.name);
      if (existing) return state;
      return { ...state, shoppingListItems: [...state.shoppingListItems, action.payload] };
    }
    case 'REMOVE_FROM_SHOPPING_LIST':
      return {
        ...state,
        shoppingListItems: state.shoppingListItems.filter(i => i.name !== action.payload),
      };
    case 'ADD_TOAST':
      return { ...state, toasts: [...state.toasts, { id: Date.now(), ...action.payload }] };
    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter(t => t.id !== action.payload) };
    case 'RESET_DIRTY':
      return { ...state, dirty: false };
    case 'LOAD_SAVED_STATE':
      return { ...state, ...action.payload, loading: false };
    default:
      return state;
  }
}

export function PreparationProvider({ children, itemId, planId }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const channelRef = useRef(null);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    dispatch({ type: 'ADD_TOAST', payload: { message, type } });
    setTimeout(() => dispatch({ type: 'REMOVE_TOAST', payload: id }), 3000);
  }, []);

  const saveState = useCallback(() => {
    if (!itemId) return;
    try {
      const saveData = {
        currentStep: state.currentStep,
        completedSteps: state.completedSteps,
        checkedIngredients: state.checkedIngredients,
        userNotes: state.userNotes,
        servings: state.servings,
        unitSystem: state.unitSystem,
        shoppingListItems: state.shoppingListItems,
      };
      localStorage.setItem(`sugarcare_prep_${itemId}`, JSON.stringify(saveData));
      dispatch({ type: 'RESET_DIRTY' });

      if (channelRef.current) {
        channelRef.current.postMessage({ type: 'STATE_SYNC', itemId, data: saveData });
      }
    } catch (e) {
      console.error('Failed to save state:', e);
    }
  }, [itemId, state.currentStep, state.completedSteps, state.checkedIngredients, state.userNotes, state.servings, state.unitSystem, state.shoppingListItems]);

  const loadSavedState = useCallback(() => {
    if (!itemId) return null;
    try {
      const saved = localStorage.getItem(`sugarcare_prep_${itemId}`);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  }, [itemId]);

  useEffect(() => {
    if (typeof window === 'undefined' || !itemId) return;
    const channel = new BroadcastChannel('sugarcare-prep-sync');
    channelRef.current = channel;

    channel.onmessage = (event) => {
      if (event.data.type === 'STATE_SYNC' && event.data.itemId === itemId) {
        dispatch({ type: 'LOAD_SAVED_STATE', payload: event.data.data });
      }
    };

    return () => {
      channel.close();
      channelRef.current = null;
    };
  }, [itemId]);

  const value = {
    state,
    dispatch,
    addToast,
    saveState,
    loadSavedState,
    isStepComplete: useCallback((stepId) => state.completedSteps.includes(stepId), [state.completedSteps]),
    isIngredientChecked: useCallback((name) => state.checkedIngredients.includes(name), [state.checkedIngredients]),
    progress: state.item?.steps?.length
      ? Math.round((state.completedSteps.length / state.item.steps.length) * 100)
      : 0,
  };

  return (
    <PreparationContext.Provider value={value}>
      {children}
    </PreparationContext.Provider>
  );
}

export function usePreparation() {
  const context = useContext(PreparationContext);
  if (!context) throw new Error('usePreparation must be used within PreparationProvider');
  return context;
}
