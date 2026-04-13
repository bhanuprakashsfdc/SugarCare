'use client';

import { Suspense, lazy, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import Footer from '@/components/Footer';
import { PreparationProvider, usePreparation } from '@/context/PreparationContext';
import { fetchPreparationItem } from '@/lib/api';
import { getComponentForType } from './dynamic/ComponentRegistry';
import SkeletonLoader from './SkeletonLoader';
import ToastContainer from './ToastContainer';

function UnsavedChangesGuard() {
  const { state, saveState } = usePreparation();
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (!state.dirty) return;

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [state.dirty]);

  return null;
}

function DynamicContent({ type }) {
  const Component = getComponentForType(type);
  return (
    <Suspense fallback={<SkeletonLoader />}>
      <Component />
    </Suspense>
  );
}

function PreparationContent({ itemId, planId }) {
  const { state, dispatch, loadSavedState } = usePreparation();
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const result = await fetchPreparationItem(planId, itemId, { signal: controller.signal });

        if (result.item) {
          dispatch({ type: 'SET_ITEM', payload: result.item });

          if (result.savedState) {
            dispatch({
              type: 'LOAD_SAVED_STATE',
              payload: {
                currentStep: result.savedState.currentStep || 0,
                completedSteps: result.savedState.completedSteps || [],
                checkedIngredients: result.savedState.checkedIngredients || [],
                userNotes: result.savedState.userNotes || '',
                servings: result.savedState.servings || result.item.servings || 1,
                unitSystem: result.savedState.unitSystem || 'imperial',
                shoppingListItems: result.savedState.shoppingListItems || [],
              },
            });
          }
        } else {
          setError('Preparation item not found');
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Failed to load preparation data');
        }
      }
    }

    load();
    return () => controller.abort();
  }, [planId, itemId, dispatch]);

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        <span className="material-symbols-outlined text-6xl text-error mb-4 block">error</span>
        <h2 className="text-2xl font-headline font-extrabold text-on-surface mb-2">Something went wrong</h2>
        <p className="text-on-surface-variant mb-6">{error}</p>
        <a
          href="/weekly-plan"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-md hover:opacity-90 transition-all"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Weekly Plan
        </a>
      </div>
    );
  }

  return (
    <>
      <UnsavedChangesGuard />
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {state.loading ? (
          <SkeletonLoader />
        ) : state.item ? (
          <DynamicContent type={state.item.type} />
        ) : null}
      </main>
      <ToastContainer />
    </>
  );
}

export default function PreparationLayout({ itemId, planId }) {
  return (
    <PreparationProvider itemId={itemId} planId={planId}>
      <Navbar />
      <PreparationContent itemId={itemId} planId={planId} />
      <Footer />
      <BottomNav />
    </PreparationProvider>
  );
}
